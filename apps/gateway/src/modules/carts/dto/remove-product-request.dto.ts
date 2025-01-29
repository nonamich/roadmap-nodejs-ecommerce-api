import { ApiProperty } from '@nestjs/swagger';
import { RemoveProductRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class RemoveProductRequestDto
  implements Omit<RemoveProductRequest, 'userId'>
{
  @ApiProperty()
  @IsInt()
  productId!: number;
}
