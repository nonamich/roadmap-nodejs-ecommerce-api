import { Inject, Injectable } from '@nestjs/common';
import { BrokerService } from '@repo/broker';
import { GrpcInvalidArgumentException } from '@repo/grpc/nest';
import { CART_SERVICE_NAME, CartServiceClient } from '@repo/grpc/pb/cart';
import { OrderStatus } from '@repo/grpc/pb/order';
import {
  PAYMENT_SERVICE_NAME,
  PaymentServiceClient,
} from '@repo/grpc/pb/payment';
import { firstValueFrom } from 'rxjs';
import {
  CompleteOrdersRequestDto,
  CreateOrderRequestDto,
  GetOrderByIntentIdRequestDto,
  GetOrderRequestDto,
  GetOrdersRequestDto,
} from './dto/requests';
import { OrderResponseDto } from './dto/responses';
import { OrderEntity } from './entities';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrderService {
  constructor(
    @Inject(CART_SERVICE_NAME)
    private readonly cartService: CartServiceClient,

    @Inject(PAYMENT_SERVICE_NAME)
    private readonly paymentService: PaymentServiceClient,

    private readonly repository: OrdersRepository,
    private readonly brokerService: BrokerService,
  ) {}

  async getOrders({
    userId,
  }: GetOrdersRequestDto): Promise<OrderResponseDto[]> {
    const orders = this.createResponseDto(
      await this.repository.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    );

    return orders;
  }

  async getOrder({ orderId }: GetOrderRequestDto): Promise<OrderResponseDto> {
    const order = this.createResponseDto(
      await this.repository.findUniqueOrThrow({
        id: orderId,
      }),
    );

    return order;
  }

  async getOrderByIntentId({
    intentId,
  }: GetOrderByIntentIdRequestDto): Promise<OrderResponseDto> {
    return this.createResponseDto(
      await this.repository.findUniqueOrThrow({
        intentId,
      }),
    );
  }

  async createOrder({
    userId,
  }: CreateOrderRequestDto): Promise<OrderResponseDto> {
    const cart = await firstValueFrom(this.cartService.getCart({ userId }));
    const intent = await firstValueFrom(
      this.paymentService.createIntent({
        amountInCent: this.priceToCent(cart.totalPrice),
      }),
    );

    if (!cart.items.length) {
      throw new GrpcInvalidArgumentException('your cart is empty');
    }

    const order = this.createResponseDto(
      await this.repository.create({
        userId,
        intentId: intent.id,
        items: {
          createMany: {
            data: cart.items.map(({ quantity, price, productId }) => ({
              price,
              productId,
              quantity,
            })),
          },
        },
      }),
    );

    this.emitCreated(order);

    return order;
  }

  async completeOrder({ intentId }: CompleteOrdersRequestDto): Promise<void> {
    const order = this.createResponseDto(
      await this.repository.update({
        data: {
          status: OrderStatus.COMPLETED,
        },
        where: {
          intentId,
        },
      }),
    );

    this.emitCompleted(order);
  }

  priceToCent(price: number): number {
    return Math.ceil(price * 100);
  }

  emitCompleted(order: OrderResponseDto): void {
    this.brokerService.emit('order.completed', {
      orderId: order.id,
      userId: order.userId,
      createdAt: order.createdAt,
      totalPrice: order.totalPrice,
    });
  }

  emitCreated(order: OrderResponseDto): void {
    this.brokerService.emit('order.created', {
      orderId: order.id,
      userId: order.userId,
      products: order.items.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
    });
  }

  createResponseDto(order: OrderEntity): OrderResponseDto;
  createResponseDto(orders: OrderEntity[]): OrderResponseDto[];
  createResponseDto(
    input: OrderEntity | OrderEntity[],
  ): OrderResponseDto | OrderResponseDto[] {
    if (Array.isArray(input)) {
      return input.map((entity) => this.createResponseDto(entity));
    }

    return {
      ...input,
      totalPrice: this.getTotalPrice(input),
    };
  }

  getTotalPrice(order: OrderEntity): number {
    return order.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }
}
