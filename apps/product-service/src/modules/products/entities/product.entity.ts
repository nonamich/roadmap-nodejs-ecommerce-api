import { Product } from '@prisma/client/product/index.js';
import { BrandEntity } from '~/modules/brands/entities';
import { CategoryEntity } from '~/modules/categories/entities';

export class ProductEntity implements Product {
  id!: string;
  amount!: number;
  slug!: string;
  brandId!: string;
  categoryId!: string;
  createdAt!: Date;
  image!: string;
  description!: string;
  price!: number;
  rating!: number | null;
  title!: string;
  brand!: BrandEntity;
  category!: CategoryEntity;
}
