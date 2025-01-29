import { AddToCartRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class AddToCartRequestDto implements AddToCartRequest {
  @IsInt()
  productId!: number;

  @IsInt()
  userId!: number;

  @IsInt()
  quantity!: number;
}
