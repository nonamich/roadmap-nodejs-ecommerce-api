import { AddToCartRequest } from '@/grpc/pb/cart';
import { IsInt, IsString, Min } from 'class-validator';

export class AddToCartRequestDto implements AddToCartRequest {
  @IsString()
  productId!: string;

  @IsString()
  userId!: string;

  @IsInt()
  @Min(1)
  quantity!: number;
}
