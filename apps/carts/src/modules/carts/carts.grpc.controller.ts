import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
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
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
export class CartsGrpcController implements CartsServiceController {
  constructor(private readonly service: CartsService) {}

  async removeCart(@GrpcPayload() dto: RemoveCartRequestDto) {
    return this.service.removeCart(dto);
  }

  async getCart(@GrpcPayload() dto: GetCartRequestDto) {
    return await this.service.getCart(dto);
  }

  async addToCart(
    @GrpcPayload()
    dto: AddToCartRequestDto,
  ) {
    return await this.service.addToCart(dto);
  }

  async removeFromCart(@GrpcPayload() dto: RemoveFromCartRequestDto) {
    return await this.service.removeFromCart(dto);
  }
}
