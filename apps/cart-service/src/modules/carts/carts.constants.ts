import { Prisma } from '@packages/shared/db/cart';

export const CART_ITEM_SELECT = {
  quantity: true,
  productId: true,
  price: true,
  userId: true,
} as const satisfies Prisma.CartItemSelect;
