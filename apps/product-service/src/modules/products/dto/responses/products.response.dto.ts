import { ProductsResponse } from '@repo/grpc/proto/products';
import { PaginationResponseDto } from './pagination.response.dto';
import { ProductResponseDto } from './product.response.dto';

export class ProductsResponseDto implements ProductsResponse {
  products!: ProductResponseDto[];
  pagination!: PaginationResponseDto;
}
