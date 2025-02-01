import { RemoveCartRequest } from '@repo/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class RemoveCartRequestDto implements RemoveCartRequest {
  @IsInt()
  userId!: number;
}
