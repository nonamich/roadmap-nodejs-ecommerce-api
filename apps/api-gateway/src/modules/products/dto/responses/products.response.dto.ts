import { ApiProperty } from '@nestjs/swagger';
import { ProductsResponse } from '@repo/grpc/proto/products';
import { PaginationResponseDto } from './pagination.response.dto';
import { ProductResponseDto } from './product.response.dto';

export class ProductsResponseDto implements ProductsResponse {
  @ApiProperty({ isArray: true, type: ProductResponseDto })
  products!: ProductResponseDto[];

  @ApiProperty({ type: PaginationResponseDto })
  pagination!: PaginationResponseDto;
}
