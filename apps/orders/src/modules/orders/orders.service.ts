import { Inject, Injectable } from '@nestjs/common';
import { GrpcInvalidArgumentException } from '@packages/grpc/nest';
import { CartsServiceClient } from '@packages/grpc/proto/carts';
import { OrderResponse } from '@packages/grpc/proto/orders';
import { PaymentsServiceClient } from '@packages/grpc/proto/payments';
import { OrderStatus } from 'prisma-client';
import { firstValueFrom } from 'rxjs';
import { ORMService } from '~/modules/orm/orm.service';
import {
  CompleteOrdersRequestDto,
  CreateOrderRequestDto,
  GetOrderRequestDto,
  GetOrdersRequestDto,
} from './dto';
import {
  CARTS_SERVICE_PROVIDER_TOKEN,
  ORDER_SELECT,
  PAYMENTS_SERVICE_PROVIDER_TOKEN,
} from './orders.constants';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(CARTS_SERVICE_PROVIDER_TOKEN)
    private readonly cartsService: CartsServiceClient,

    @Inject(PAYMENTS_SERVICE_PROVIDER_TOKEN)
    private readonly paymentsService: PaymentsServiceClient,

    private readonly orm: ORMService,
  ) {}

  async getOrders({ userId }: GetOrdersRequestDto) {
    const orders = await this.orm.order.findMany({
      select: ORDER_SELECT,
      where: {
        userId,
      },
    });

    return { orders };
  }
  async getOrder({ orderId }: GetOrderRequestDto) {
    const order: OrderResponse = await this.orm.order.findUniqueOrThrow({
      select: ORDER_SELECT,
      where: {
        id: orderId,
      },
    });

    return order;
  }

  priceToCent(price: number) {
    return Math.ceil(price * 100);
  }

  async createOrder({ userId }: CreateOrderRequestDto) {
    const cart = await firstValueFrom(this.cartsService.getCart({ userId }));
    const intent = await firstValueFrom(
      this.paymentsService.createIntent({
        amountInCent: this.priceToCent(cart.totalPrice),
      }),
    );

    if (!cart.items.length) {
      throw new GrpcInvalidArgumentException('your cart is empty');
    }

    const createdOrder = await this.orm.order.create({
      select: ORDER_SELECT,
      data: {
        userId,
        indentId: intent.intentId,
        items: {
          createMany: {
            data: cart.items.map(({ quantity, price, productId }) => ({
              price,
              productId,
              quantity,
            })),
          },
        },
      },
    });

    await firstValueFrom(this.cartsService.removeCart({ userId }));

    return createdOrder;
  }

  async completeOrder({ indentId }: CompleteOrdersRequestDto) {
    await this.orm.order.update({
      data: {
        status: OrderStatus.COMPLETED,
      },
      where: {
        indentId,
      },
    });

    return;
  }
}
