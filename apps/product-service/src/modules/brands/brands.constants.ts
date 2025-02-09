import { Prisma } from '@packages/shared/db/product';

export const BRAND_SELECT = {
  id: true,
  name: true,
  slug: true,
} as const satisfies Prisma.BrandSelect;
