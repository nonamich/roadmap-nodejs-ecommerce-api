import { GetCartRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class GetCartRequestDto implements GetCartRequest {
  @IsInt()
  userId!: number;
}
