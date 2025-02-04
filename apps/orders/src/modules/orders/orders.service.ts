import { Inject, Injectable } from '@nestjs/common';
import { GrpcInvalidArgumentException } from '@repo/grpc/nest';
import { CARTS_SERVICE_NAME, CartsServiceClient } from '@repo/grpc/proto/carts';
import {
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
} from '@repo/grpc/proto/payments';
import { firstValueFrom } from 'rxjs';
import {
  CreateOrderRequestDto,
  GetOrderByIntentIdRequestDto,
  GetOrderRequestDto,
  GetOrdersRequestDto,
} from './dto/requests';
import { OrderEntity } from './entities';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(CARTS_SERVICE_NAME)
    private readonly cartsService: CartsServiceClient,

    @Inject(PAYMENTS_SERVICE_NAME)
    private readonly paymentsService: PaymentsServiceClient,

    private readonly repository: OrdersRepository,
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
    const cart = await firstValueFrom(this.cartsService.getCart({ userId }));
    const intent = await firstValueFrom(
      this.paymentsService.createIntent({
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

    await firstValueFrom(this.cartsService.removeCart({ userId }));

    return createdOrder;
  }

  // async completeOrder({ intentId }: CompleteOrdersRequestDto): Promise<void> {
  //   await this.repository.update({
  //     data: {
  //       status: OrderStatus.COMPLETED,
  //     },
  //     where: {
  //       intentId,
  //     },
  //   });
  // }

  priceToCent(price: number): number {
    return Math.ceil(price * 100);
  }
}
