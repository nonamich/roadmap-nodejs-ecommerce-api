import { Product } from 'prisma-client';
import { BrandEntity } from '~/modules/brands/entities';
import { CategoryEntity } from '~/modules/categories/entities';

export class ProductEntity implements Product {
  id!: number;
  amount!: number;
  brandId!: number;
  categoryId!: number;
  createdAt!: Date;
  image!: string;
  description!: string;
  price!: number;
  rating!: number | null;
  title!: string;
  brand!: BrandEntity;
  category!: CategoryEntity;
}
