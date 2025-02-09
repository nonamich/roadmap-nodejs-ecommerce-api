import { Category } from '@prisma/client/product/index.js';

export class CategoryEntity implements Category {
  id!: string;
  name!: string;
  slug!: string;
}
