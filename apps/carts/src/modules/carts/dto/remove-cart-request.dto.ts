import { RemoveFromCartRequest } from '@repo/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class RemoveFromCartRequestDto implements RemoveFromCartRequest {
  @IsInt()
  userId!: number;

  @IsInt()
  productId!: number;
}
