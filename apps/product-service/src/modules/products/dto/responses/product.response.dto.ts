import { ProductResponse } from '@repo/grpc/proto/products';
import { BrandResponseDto } from './brand.response.dto';
import { CategoryResponseDto } from './category.response.dto';

export class ProductResponseDto implements ProductResponse {
  id!: string;
  amount!: number;
  image!: string;
  price!: number;
  title!: string;
  slug!: string;
  description!: string;
  rating?: number | null | undefined;
  createdAt!: Date;
  brand!: BrandResponseDto;
  category!: CategoryResponseDto;
}
