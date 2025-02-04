import { Prisma } from 'prisma-client';

export const ORDER_SELECT = {
  id: true,
  status: true,
  intentId: true,
  createdAt: true,
  userId: true,
  items: {
    select: {
      productId: true,
      quantity: true,
      price: true,
      orderId: true,
    },
  },
} as const satisfies Prisma.OrderSelect;
