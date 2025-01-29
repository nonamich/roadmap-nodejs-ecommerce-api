import { ApiProperty } from '@nestjs/swagger';
import { UpdateProductQuantityRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class UpdateProductQuantityRequestDto
  implements Omit<UpdateProductQuantityRequest, 'userId'>
{
  @ApiProperty()
  @IsInt()
  productId!: number;

  @ApiProperty()
  @IsInt()
  quantity!: number;
}
