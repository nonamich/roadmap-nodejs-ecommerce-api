import { RemoveProductRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class RemoveProductRequestDto implements RemoveProductRequest {
  @IsInt()
  userId!: number;

  @IsInt()
  productId!: number;
}
