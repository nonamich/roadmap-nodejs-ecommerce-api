import { ApiProperty } from '@nestjs/swagger';
import {
  Brand,
  Category,
  Product,
  ProductsResponse,
} from '@repo/grpc/proto/products';
import { PaginationResponseDto } from './pagination-response.dto';

export class BrandDto implements Brand {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  name!: string;
}
export class CategoryDto implements Category {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  name!: string;
}

export class ProductResponseDto implements Product {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  image!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ required: false, nullable: true, type: Number })
  rating?: number;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty()
  brand!: BrandDto;

  @ApiProperty()
  category!: CategoryDto;
}

export class ProductsResponseDto implements ProductsResponse {
  @ApiProperty({ isArray: true, type: ProductResponseDto })
  products!: ProductResponseDto[];

  @ApiProperty({ type: PaginationResponseDto })
  pagination!: PaginationResponseDto;
}
