import { AddToCartRequest } from '@repo/grpc/proto/carts';
import { IsInt, IsString, Min } from 'class-validator';

export class AddToCartRequestDto implements AddToCartRequest {
  @IsInt()
  productId!: number;

  @IsString()
  userId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}
