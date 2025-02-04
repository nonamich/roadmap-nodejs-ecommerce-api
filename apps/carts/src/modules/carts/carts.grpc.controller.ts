import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  CartsServiceController,
  CartsServiceControllerMethods,
} from '@repo/grpc/proto/carts';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters';
import { CartsService } from './carts.service';
import {
  AddToCartRequestDto,
  GetCartRequestDto,
  RemoveCartRequestDto,
  RemoveFromCartRequestDto,
} from './dto';
import { CartModel } from './model';

@GrpcService()
@CartsServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
export class CartsGrpcController implements CartsServiceController {
  constructor(private readonly service: CartsService) {}

  async removeCart(@GrpcPayload() dto: RemoveCartRequestDto): Promise<void> {
    return this.service.removeCart(dto);
  }

  async getCart(@GrpcPayload() dto: GetCartRequestDto): Promise<CartModel> {
    return await this.service.getCart(dto);
  }

  async addToCart(
    @GrpcPayload()
    dto: AddToCartRequestDto,
  ): Promise<CartModel> {
    return await this.service.addToCart(dto);
  }

  async removeFromCart(
    @GrpcPayload() dto: RemoveFromCartRequestDto,
  ): Promise<CartModel> {
    return await this.service.removeFromCart(dto);
  }
}
