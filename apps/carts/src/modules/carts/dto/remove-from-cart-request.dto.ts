import { RemoveCartRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class RemoveCartRequestDto implements RemoveCartRequest {
  @IsInt()
  userId!: number;
}
