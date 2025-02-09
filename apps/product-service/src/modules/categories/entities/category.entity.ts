import { Category } from '@prisma-client/index.js';

export class CategoryEntity implements Category {
  id!: string;
  name!: string;
  slug!: string;
}
