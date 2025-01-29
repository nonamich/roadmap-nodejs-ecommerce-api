import { RemoveFromCartRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class RemoveFromCartRequestDto implements RemoveFromCartRequest {
  @IsInt()
  userId!: number;

  @IsInt()
  productId!: number;
}
