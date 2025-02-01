export const CARTS_CLIENT_GRPC_PROVIDER_TOKEN = Symbol(
  'CARTS_CLIENT_GRPC_PROVIDER_TOKEN',
);
export const CARTS_SERVICE_PROVIDER_TOKEN = Symbol(
  'CARTS_SERVICE_PROVIDER_TOKEN',
);

export const PAYMENTS_CLIENT_GRPC_PROVIDER_TOKEN = Symbol(
  'PAYMENTS_CLIENT_GRPC_PROVIDER_TOKEN',
);
export const PAYMENTS_SERVICE_PROVIDER_TOKEN = Symbol(
  'PAYMENTS_SERVICE_PROVIDER_TOKEN',
);

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
