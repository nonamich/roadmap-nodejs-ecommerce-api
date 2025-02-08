import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@/grpc/nest';
import { BoolValue } from '@/grpc/pb/google/protobuf/wrappers';
import {
  GetOrderByIntentIdRequest,
  OrderResponse,
  OrderServiceController,
  OrderServiceControllerMethods,
  OrdersResponse,
} from '@/grpc/pb/order';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters';
import {
  CancelOrderRequestDto,
  CreateOrderRequestDto,
  GetOrderRequestDto,
  GetOrdersRequestDto,
  IsOwnerRequestDto,
} from './dto/requests';
import { OrderService } from './orders.service';

@GrpcService()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
@OrderServiceControllerMethods()
export class OrdersGrpcController implements OrderServiceController {
  constructor(private readonly service: OrderService) {}

  async getOrders(
    @GrpcPayload() dto: GetOrdersRequestDto,
  ): Promise<OrdersResponse> {
    const orders = await this.service.getOrders(dto);

    return {
      orders,
    };
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

  async getOrderByIntentId(
    @GrpcPayload() dto: GetOrderByIntentIdRequest,
  ): Promise<OrderResponse> {
    const order = await this.service.getOrderByIntentId(dto);

    return order;
  }

  async cancelOrder(@GrpcPayload() dto: CancelOrderRequestDto): Promise<void> {
    await this.service.cancelOrder(dto);
  }

  async isOwner(@GrpcPayload() dto: IsOwnerRequestDto): Promise<BoolValue> {
    const isOwner = await this.service.isOwner(dto);

    return {
      value: isOwner,
    };
  }
}
