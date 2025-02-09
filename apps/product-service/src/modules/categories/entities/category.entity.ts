import { Category } from '@packages/shared/db/product';

export class CategoryEntity implements Category {
  id!: string;
  name!: string;
  slug!: string;
}
