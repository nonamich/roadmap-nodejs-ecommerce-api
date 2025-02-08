import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@/grpc/nest';
import {
  CartServiceController,
  CartServiceControllerMethods,
} from '@/grpc/pb/cart';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters';
import { CartService } from './carts.service';
import {
  AddToCartRequestDto,
  GetCartRequestDto,
  RemoveCartRequestDto,
  RemoveFromCartRequestDto,
} from './dto/requests';
import { CartResponseDto } from './dto/responses/cart.response.dto';

@GrpcService()
@CartServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
export class CartsGrpcController implements CartServiceController {
  constructor(private readonly service: CartService) {}

  async removeCart(@GrpcPayload() dto: RemoveCartRequestDto): Promise<void> {
    return this.service.removeCart(dto);
  }

  async getCart(
    @GrpcPayload() dto: GetCartRequestDto,
  ): Promise<CartResponseDto> {
    return await this.service.getCart(dto);
  }

  async addToCart(
    @GrpcPayload()
    dto: AddToCartRequestDto,
  ): Promise<CartResponseDto> {
    return await this.service.addToCart(dto);
  }

  async removeFromCart(
    @GrpcPayload() dto: RemoveFromCartRequestDto,
  ): Promise<CartResponseDto> {
    return await this.service.removeFromCart(dto);
  }
}
