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
    },
  },
} as const;
