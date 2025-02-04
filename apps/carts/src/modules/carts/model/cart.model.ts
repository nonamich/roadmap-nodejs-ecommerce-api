import { CartResponse } from '@repo/grpc/proto/carts';
import { CartItemModel } from './cart-item.model';

export class CartModel implements CartResponse {
  items!: CartItemModel[];
  totalQuantity!: number;
  totalPrice!: number;
}
