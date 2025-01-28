import { GetCartQuantityByUserIdRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class GetCartQuantityByUserIdRequestDto
  implements GetCartQuantityByUserIdRequest
{
  @IsInt()
  userId!: number;
}
