import { Controller, UseFilters } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { GrpcToGrpcExceptionFilter, GrpcValidationPipe } from '@repo/grpc/nest';
import {
  GetOrderByIntentIdRequest,
  OrdersServiceController,
  OrdersServiceControllerMethods,
} from '@repo/grpc/proto/orders';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import {
  CompleteOrdersRequestDto,
  CreateOrderRequestDto,
  GetOrderRequestDto,
  GetOrdersRequestDto,
} from './dto';
import { OrdersService } from './orders.service';

@Controller()
@OrdersServiceControllerMethods()
export class OrdersGrpcController implements OrdersServiceController {
  constructor(private readonly service: OrdersService) {}

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async getOrders(@Payload(GrpcValidationPipe) dto: GetOrdersRequestDto) {
    const orders = await this.service.getOrders(dto);

    return { orders };
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async getOrder(@Payload(GrpcValidationPipe) dto: GetOrderRequestDto) {
    return await this.service.getOrder(dto);
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async createOrder(@Payload(GrpcValidationPipe) dto: CreateOrderRequestDto) {
    return await this.service.createOrder(dto);
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async completeOrder(
    @Payload(GrpcValidationPipe) dto: CompleteOrdersRequestDto,
  ) {
    return await this.service.completeOrder(dto);
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async getOrderByIntentId(dto: GetOrderByIntentIdRequest) {
    return await this.service.getOrderByIntentId(dto);
  }
}
