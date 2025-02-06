import { CartItem } from 'prisma-client';

export class CartItemEntity implements CartItem {
  productId!: number;
  quantity!: number;
  price!: number;
  userId!: number;
}
