import { CartResponse } from '@packages/grpc/pb/cart';
import { CartItemResponseDto } from './cart-item.response.dto';

export class CartResponseDto implements CartResponse {
  items!: CartItemResponseDto[];
  totalQuantity!: number;
  totalPrice!: number;
}
