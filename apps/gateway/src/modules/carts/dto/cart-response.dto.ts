import { ApiProperty } from '@nestjs/swagger';
import { Cart } from '@packages/grpc/proto/carts';
import { CartItemResponseDto } from './cart-item-response.dto';

export class CartResponseDto implements Cart {
  @ApiProperty()
  totalPrice!: number;

  @ApiProperty({ type: CartItemResponseDto, isArray: true })
  items!: CartItemResponseDto[];
}
