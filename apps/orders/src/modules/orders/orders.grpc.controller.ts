import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  GetOrderByIntentIdRequest,
  GetOrdersResponse,
  OrderResponse,
  OrdersServiceController,
  OrdersServiceControllerMethods,
} from '@repo/grpc/proto/orders';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters';
import {
  CompleteOrdersRequestDto,
  CreateOrderRequestDto,
  GetOrderRequestDto,
  GetOrdersRequestDto,
} from './dto';
import { OrdersService } from './orders.service';

@GrpcService()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
@OrdersServiceControllerMethods()
export class OrdersGrpcController implements OrdersServiceController {
  constructor(private readonly service: OrdersService) {}

  async getOrders(
    @GrpcPayload() dto: GetOrdersRequestDto,
  ): Promise<GetOrdersResponse> {
    const orders = await this.service.getOrders(dto);

    return { orders };
  }

  async getOrder(
    @GrpcPayload() dto: GetOrderRequestDto,
  ): Promise<OrderResponse> {
    return await this.service.getOrder(dto);
  }

  async createOrder(
    @GrpcPayload() dto: CreateOrderRequestDto,
  ): Promise<OrderResponse> {
    return await this.service.createOrder(dto);
  }

  async completeOrder(
    @GrpcPayload() dto: CompleteOrdersRequestDto,
  ): Promise<void> {
    return await this.service.completeOrder(dto);
  }

  async getOrderByIntentId(
    dto: GetOrderByIntentIdRequest,
  ): Promise<OrderResponse> {
    const order = await this.service.getOrderByIntentId(dto);

    return order;
  }
}
