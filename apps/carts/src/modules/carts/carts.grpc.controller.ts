import { UseFilters } from '@nestjs/common';
import { GrpcService, Payload } from '@nestjs/microservices';
import { GrpcToGrpcExceptionFilter, GrpcValidationPipe } from '@repo/grpc/nest';
import {
  CartsServiceController,
  CartsServiceControllerMethods,
} from '@repo/grpc/proto/carts';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import { CartsService } from './carts.service';
import {
  AddToCartRequestDto,
  GetCartRequestDto,
  RemoveCartRequestDto,
  RemoveFromCartRequestDto,
} from './dto';

@GrpcService()
@CartsServiceControllerMethods()
export class CartsGrpcController implements CartsServiceController {
  constructor(private readonly service: CartsService) {}

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async removeCart(@Payload(GrpcValidationPipe) dto: RemoveCartRequestDto) {
    return this.service.removeCart(dto);
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async getCart(@Payload(GrpcValidationPipe) dto: GetCartRequestDto) {
    return await this.service.getCart(dto);
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async addToCart(
    @Payload(GrpcValidationPipe)
    dto: AddToCartRequestDto,
  ) {
    return await this.service.addToCart(dto);
  }

  @UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
  async removeFromCart(
    @Payload(GrpcValidationPipe) dto: RemoveFromCartRequestDto,
  ) {
    return await this.service.removeFromCart(dto);
  }
}
