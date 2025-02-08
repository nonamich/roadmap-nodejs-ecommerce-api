import { ProductsResponse } from '@/grpc/pb/product';
import { PaginationResponseDto } from './pagination.response.dto';
import { ProductResponseDto } from './product.response.dto';

export class ProductsResponseDto implements ProductsResponse {
  products!: ProductResponseDto[];
  pagination!: PaginationResponseDto;
}
