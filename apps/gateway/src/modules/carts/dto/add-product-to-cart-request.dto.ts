import { ApiProperty } from '@nestjs/swagger';
import { AddProductToCartRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class AddProductToCartRequestDto
  implements Omit<AddProductToCartRequest, 'userId'>
{
  @ApiProperty()
  @IsInt()
  productId!: number;

  @ApiProperty()
  @IsInt()
  quantity!: number;
}
