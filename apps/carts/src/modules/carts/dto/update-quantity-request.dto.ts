import { UpdateQuantityRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class UpdateQuantityRequestDto implements UpdateQuantityRequest {
  @IsInt()
  userId!: number;

  @IsInt()
  productId!: number;

  @IsInt()
  quantity!: number;
}
