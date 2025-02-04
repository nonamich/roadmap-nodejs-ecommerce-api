export const PRODUCT_SELECT = {
  id: true,
  amount: true,
  brandId: true,
  categoryId: true,
  createdAt: true,
  image: true,
  description: true,
  price: true,
  rating: true,
  title: true,
  brand: {
    select: {
      id: true,
      name: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
} as const;
