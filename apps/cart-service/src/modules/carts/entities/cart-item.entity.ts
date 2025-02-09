import { CartItem } from '@packages/shared/db/cart';

export class CartItemEntity implements CartItem {
  productId!: string;
  quantity!: number;
  price!: number;
  userId!: string;
}
