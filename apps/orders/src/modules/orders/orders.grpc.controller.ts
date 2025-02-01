import { Controller, UseFilters } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  GrpcToGrpcExceptionFilter,
  GrpcValidationPipe,
} from '@packages/grpc/nest';
import {
  OrdersServiceController,
  OrdersServiceControllerMethods,
} from '@packages/grpc/proto/orders';
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
    return await this.service.getOrders(dto);
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
}
