import { UpdateProductQuantityRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class UpdateProductQuantityRequestDto
  implements UpdateProductQuantityRequest
{
  @IsInt()
  userId!: number;

  @IsInt()
  productId!: number;

  @IsInt()
  quantity!: number;
}
