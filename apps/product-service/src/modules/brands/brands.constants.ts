import { Prisma } from 'prisma-client';

export const BRAND_SELECT = {
  id: true,
  name: true,
} as const satisfies Prisma.BrandSelect;
