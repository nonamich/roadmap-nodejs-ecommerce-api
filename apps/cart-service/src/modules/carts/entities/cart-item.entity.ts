import { CartItem } from '@prisma/client/cart/index.js';

export class CartItemEntity implements CartItem {
  productId!: string;
  quantity!: number;
  price!: number;
  userId!: string;
}
