import { Prisma } from '@prisma-client/index.js';

export const CART_ITEM_SELECT = {
  quantity: true,
  productId: true,
  price: true,
  userId: true,
} as const satisfies Prisma.CartItemSelect;
