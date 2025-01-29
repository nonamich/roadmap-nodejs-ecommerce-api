import { ApiProperty } from '@nestjs/swagger';
import { UpdateQuantityRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class UpdateQuantityRequestDto
  implements Omit<UpdateQuantityRequest, 'userId' | 'productId'>
{
  @ApiProperty()
  @IsInt()
  quantity!: number;
}
