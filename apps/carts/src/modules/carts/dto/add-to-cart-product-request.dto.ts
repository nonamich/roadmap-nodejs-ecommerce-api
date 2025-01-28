import { AddProductToCartRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class AddProductToCartRequestDto implements AddProductToCartRequest {
  @IsInt()
  productId!: number;

  @IsInt()
  userId!: number;

  @IsInt()
  quantity!: number;
}
