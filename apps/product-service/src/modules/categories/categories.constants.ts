import { Prisma } from '@packages/shared/db/product';

export const CATEGORY_SELECT = {
  id: true,
  name: true,
  slug: true,
} as const satisfies Prisma.CategorySelect;
