import { Prisma } from '@packages/shared/db/product';
import { BRAND_SELECT } from '../brands/brands.constants';
import { CATEGORY_SELECT } from '../categories/categories.constants';

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
  slug: true,
  brand: {
    select: BRAND_SELECT,
  },
  category: {
    select: CATEGORY_SELECT,
  },
} as const satisfies Prisma.ProductSelect;
