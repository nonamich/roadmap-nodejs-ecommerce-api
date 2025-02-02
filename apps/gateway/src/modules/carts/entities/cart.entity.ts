import { ApiProperty } from '@nestjs/swagger';
import { CartResponse } from '@repo/grpc/proto/carts';
import { CartItemEntity } from './cart-item.entity';

export class CartEntity implements CartResponse {
  @ApiProperty()
  totalPrice!: number;

  @ApiProperty()
  totalQuantity!: number;

  @ApiProperty({ type: CartItemEntity, isArray: true })
  items!: CartItemEntity[];
}
