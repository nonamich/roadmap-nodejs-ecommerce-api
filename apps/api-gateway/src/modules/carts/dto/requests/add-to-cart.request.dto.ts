import { ApiProperty } from '@nestjs/swagger';
import { AddToCartRequest } from '@/grpc/pb/cart';
import { IsInt, Min } from 'class-validator';

export class AddToCartRequestDto
  implements Omit<AddToCartRequest, 'userId' | 'productId'>
{
  @ApiProperty()
  @IsInt()
  @Min(1)
  quantity!: number;
}
