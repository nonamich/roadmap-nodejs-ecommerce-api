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

  async getOrders({ userId }: GetOrdersRequestDto): Promise<OrderEntity[]> {
    return await this.repository.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getOrder({ orderId }: GetOrderRequestDto): Promise<OrderEntity> {
    return await this.repository.findUniqueOrThrow({
      id: orderId,
    });
  }

  async getOrderByIntentId({
    intentId,
  }: GetOrderByIntentIdRequestDto): Promise<OrderEntity> {
    return await this.repository.findUniqueOrThrow({
      intentId,
    });
  }

  async createOrder({ userId }: CreateOrderRequestDto): Promise<OrderEntity> {
    const cart = await firstValueFrom(this.cartService.getCart({ userId }));
    const intent = await firstValueFrom(
      this.paymentService.createIntent({
        amountInCent: this.priceToCent(cart.totalPrice),
      }),
    );

    if (!cart.items.length) {
      throw new GrpcInvalidArgumentException('your cart is empty');
    }

    const createdOrder = await this.repository.create({
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
    });

    this.brokerService.emit('order.created', {
      orderId: createdOrder.id,
      userId,
      products: createdOrder.items.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
    });

    return createdOrder;
  }

  async completeOrder({ intentId }: CompleteOrdersRequestDto): Promise<void> {
    await this.repository.update({
      data: {
        status: OrderStatus.COMPLETED,
      },
      where: {
        intentId,
      },
    });
  }

  priceToCent(price: number): number {
    return Math.ceil(price * 100);
  }
}
