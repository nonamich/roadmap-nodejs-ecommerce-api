import { Prisma } from '@prisma/client/product/index.js';

export const CATEGORY_SELECT = {
  id: true,
  name: true,
  slug: true,
} as const satisfies Prisma.CategorySelect;
