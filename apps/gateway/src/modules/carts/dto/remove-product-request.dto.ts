import { ApiProperty } from '@nestjs/swagger';
import { RemoveFromCartRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class RemoveFromCartRequestDto
  implements Omit<RemoveFromCartRequest, 'userId'>
{
  @ApiProperty()
  @IsInt()
  productId!: number;
}
