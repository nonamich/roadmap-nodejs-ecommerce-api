import { Inject, Injectable } from '@nestjs/common';
import { BrokerService } from '@repo/broker';
import {
  GrpcAbortedException,
  GrpcInvalidArgumentException,
} from '@repo/grpc/nest';
import { CART_SERVICE_NAME, CartServiceClient } from '@repo/grpc/pb/cart';
import { OrderResponse, OrderStatus } from '@repo/grpc/pb/order';
import {
  PAYMENT_SERVICE_NAME,
  PaymentServiceClient,
} from '@repo/grpc/pb/payment';
import { firstValueFrom } from 'rxjs';
import { ORMService } from '../orm/orm.service';
import {
  CancelOrderRequestDto,
  CompleteOrderRequestDto,
  CreateOrderRequestDto,
  GetOrderByIntentIdRequestDto,
  GetOrderRequestDto,
  GetOrdersRequestDto,
} from './dto/requests';
import { IsOwnerRequestDto } from './dto/requests/is-owner.request.dto';
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

    private readonly orm: ORMService,
  ) {}

  async getOrders({ userId }: GetOrdersRequestDto): Promise<OrderResponse[]> {
    const orders = this.createResponse(
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

  async getOrder({ orderId }: GetOrderRequestDto): Promise<OrderResponse> {
    const order = this.createResponse(
      await this.repository.findUniqueOrThrow({
        id: orderId,
      }),
    );

    return order;
  }

  async getOrderByIntentId({
    intentId,
  }: GetOrderByIntentIdRequestDto): Promise<OrderResponse> {
    return this.createResponse(
      await this.repository.findUniqueOrThrow({
        intentId,
      }),
    );
  }

  async createOrder({ userId }: CreateOrderRequestDto): Promise<OrderResponse> {
    const cart = await firstValueFrom(this.cartService.getCart({ userId }));
    const intent = await firstValueFrom(
      this.paymentService.createIntent({
        amountInCent: this.priceToCent(cart.totalPrice),
      }),
    );

    if (!cart.items.length) {
      throw new GrpcInvalidArgumentException('your cart is empty');
    }

    const order = this.createResponse(
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

    this.emitEvent('order.created', order);

    return order;
  }

  async completeOrder({ intentId }: CompleteOrderRequestDto): Promise<void> {
    const order = this.createResponse(
      await this.repository.update({
        data: {
          status: OrderStatus.COMPLETED,
        },
        where: {
          intentId,
        },
      }),
    );

    this.emitEvent('order.completed', order);
  }

  async cancelOrder({ orderId }: CancelOrderRequestDto): Promise<void> {
    const { status } = await this.orm.order.findUniqueOrThrow({
      select: {
        status: true,
      },
      where: {
        id: orderId,
      },
    });

    if (status === OrderStatus.CANCELED) {
      throw new GrpcAbortedException(`status already is ${status}`);
    }

    const order = this.createResponse(
      await this.repository.update({
        data: {
          status: OrderStatus.CANCELED,
        },
        where: {
          id: orderId,
        },
      }),
    );

    this.emitEvent('order.canceled', order);
  }

  async cancelOrderByIntentId(intentId: string): Promise<void> {
    const order = await this.repository.findUniqueOrThrow({ intentId });

    await this.cancelOrder({
      orderId: order.id,
    });
  }

  priceToCent(price: number): number {
    return Math.ceil(price * 100);
  }

  async emitEvent(
    pattern: 'order.completed' | 'order.canceled' | 'order.created',
    order: OrderResponse,
  ): Promise<void> {
    this.brokerService.emit(pattern, {
      intentId: order.intentId,
      orderId: order.id,
      userId: order.userId,
      createdAt: order.createdAt,
      totalPrice: order.totalPrice,
    });
  }

  createResponse(order: OrderEntity): OrderResponse;
  createResponse(orders: OrderEntity[]): OrderResponse[];
  createResponse(
    input: OrderEntity | OrderEntity[],
  ): OrderResponse | OrderResponse[] {
    if (Array.isArray(input)) {
      return input.map((entity) => this.createResponse(entity));
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

  async findPendingOrders(): Promise<OrderEntity[]> {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    return await this.repository.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        status: 'WAITING_FOR_PAYMENT',
        createdAt: {
          lt: tenMinutesAgo,
        },
      },
    });
  }

  async isOwner({ orderId, userId }: IsOwnerRequestDto): Promise<boolean> {
    const order = await this.orm.order.findUnique({
      select: {
        id: true,
      },
      where: {
        id: orderId,
        userId,
      },
    });

    return !!order;
  }
}
