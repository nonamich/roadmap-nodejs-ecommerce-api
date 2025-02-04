import { CartResponse } from '@repo/grpc/proto/carts';
import { CartItemResponseDto } from './cart-item.response.dto';

export class CartResponseDto implements CartResponse {
  items!: CartItemResponseDto[];
  totalQuantity!: number;
  totalPrice!: number;
}
