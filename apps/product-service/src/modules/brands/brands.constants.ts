import { Prisma } from '@prisma/client/product/index.js';

export const BRAND_SELECT = {
  id: true,
  name: true,
  slug: true,
} as const satisfies Prisma.BrandSelect;
