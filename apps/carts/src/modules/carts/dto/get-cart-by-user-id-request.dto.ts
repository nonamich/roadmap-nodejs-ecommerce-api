import { GetCartByUserIdRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class GetCartByUserIdRequestDto implements GetCartByUserIdRequest {
  @IsInt()
  userId!: number;
}
