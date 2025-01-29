import { ApiProperty } from '@nestjs/swagger';
import { CartResponse } from '@packages/grpc/proto/carts';
import { CartItemResponseDto } from './cart-item-response.dto';

export class CartResponseDto implements CartResponse {
  @ApiProperty()
  totalPrice!: number;

  @ApiProperty()
  totalQuantity!: number;

  @ApiProperty({ type: CartItemResponseDto, isArray: true })
  items!: CartItemResponseDto[];
}
