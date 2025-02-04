import { GetCartRequest } from '@repo/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class GetCartRequestDto implements GetCartRequest {
  @IsInt()
  userId!: number;
}
