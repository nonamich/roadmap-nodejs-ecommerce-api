import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  GetOrderByIntentIdRequest,
  OrdersServiceController,
  OrdersServiceControllerMethods,
} from '@repo/grpc/proto/orders';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters';
import {
  CreateOrderRequestDto,
  GetOrderRequestDto,
  GetOrdersRequestDto,
} from './dto/requests';
import { OrderResponseDto, OrdersResponseDto } from './dto/responses';
import { OrdersService } from './orders.service';

@GrpcService()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
@OrdersServiceControllerMethods()
export class OrdersGrpcController implements OrdersServiceController {
  constructor(private readonly service: OrdersService) {}

  async getOrders(
    @GrpcPayload() dto: GetOrdersRequestDto,
  ): Promise<OrdersResponseDto> {
    const orders = await this.service.getOrders(dto);

    return {
      orders: orders.map((order) => {
        return {
          ...order,
          status: 'WAITING_FOR_PAYMENT' as const,
        };
      }),
    };
  }

  async getOrder(
    @GrpcPayload() dto: GetOrderRequestDto,
  ): Promise<OrderResponseDto> {
    return await this.service.getOrder(dto);
  }

  async createOrder(
    @GrpcPayload() dto: CreateOrderRequestDto,
  ): Promise<OrderResponseDto> {
    return await this.service.createOrder(dto);
  }

  async getOrderByIntentId(
    dto: GetOrderByIntentIdRequest,
  ): Promise<OrderResponseDto> {
    const order = await this.service.getOrderByIntentId(dto);

    return order;
  }
}
