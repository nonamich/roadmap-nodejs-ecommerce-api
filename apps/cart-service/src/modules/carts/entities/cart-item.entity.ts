import { CartItem } from 'prisma-client';

export class CartItemEntity implements CartItem {
  productId!: string;
  quantity!: number;
  price!: number;
  userId!: string;
}
