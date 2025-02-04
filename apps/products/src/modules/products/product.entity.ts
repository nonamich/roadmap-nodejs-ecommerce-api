import { Brand, Category, Product } from '@repo/grpc/proto/products';

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
  brand!: Brand;
  category!: Category;
}
