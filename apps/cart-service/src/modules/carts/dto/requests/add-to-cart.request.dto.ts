import { AddToCartRequest } from '@repo/grpc/proto/carts';
import { IsInt, Min } from 'class-validator';

export class AddToCartRequestDto implements AddToCartRequest {
  @IsInt()
  productId!: number;

  @IsInt()
  userId!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}
