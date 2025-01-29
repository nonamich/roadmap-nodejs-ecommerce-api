import { ApiProperty } from '@nestjs/swagger';
import { AddToCartRequest } from '@packages/grpc/proto/carts';
import { IsInt } from 'class-validator';

export class AddToCartRequestDto implements Omit<AddToCartRequest, 'userId'> {
  @ApiProperty()
  @IsInt()
  productId!: number;

  @ApiProperty()
  @IsInt()
  quantity!: number;
}
