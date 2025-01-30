import { Controller, Inject, UseFilters } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  GrpcInvalidArgumentException,
  GrpcToGrpcExceptionFilter,
  GrpcValidationPipe,
} from '@packages/grpc/nest';
import { CartsServiceClient } from '@packages/grpc/proto/carts';
import {
  OrdersServiceController,
  OrdersServiceControllerMethods,
} from '@packages/grpc/proto/orders';
import { firstValueFrom } from 'rxjs';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import { ORMService } from '~/modules/orm/orm.service';
import {
  CreateOrderRequestDto,
  GetOrderRequestDto,
  GetOrdersRequestDto,
} from './dto';
import { CARTS_SERVICE_PROVIDER_TOKEN, ORDER_SELECT } from './orders.constants';

@Controller()
@OrdersServiceControllerMethods()
export class OrdersGrpcController implements OrdersServiceController {
  constructor(
    @Inject(CARTS_SERVICE_PROVIDER_TOKEN)
    private readonly cartsService: CartsServiceClient,
    private readonly orm: ORMService,
  ) {}

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async getOrders(
    @Payload(GrpcValidationPipe) { userId }: GetOrdersRequestDto,
  ) {
    const orders = await this.orm.order.findMany({
      select: ORDER_SELECT,
      where: {
        userId,
      },
    });

    return { orders };
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async getOrder(@Payload(GrpcValidationPipe) { orderId }: GetOrderRequestDto) {
    const order = await this.orm.order.findUniqueOrThrow({
      select: ORDER_SELECT,
      where: {
        id: orderId,
      },
    });

    return order;
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async createOrder(
    @Payload(GrpcValidationPipe)
    { userId, address, phone }: CreateOrderRequestDto,
  ) {
    const cart = await firstValueFrom(this.cartsService.getCart({ userId }));

    if (!cart.items.length) {
      throw new GrpcInvalidArgumentException('your cart is empty');
    }

    const createdOrder = await this.orm.order.create({
      select: ORDER_SELECT,
      data: {
        address,
        phone,
        userId,
        items: {
          createMany: {
            data: cart.items.map(({ product, quantity }) => ({
              price: product!.price,
              productId: product!.id,
              quantity,
            })),
          },
        },
      },
    });

    await firstValueFrom(this.cartsService.removeCart({ userId }));

    return createdOrder;
  }
}
