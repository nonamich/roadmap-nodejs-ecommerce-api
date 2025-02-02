import { ApiProperty } from '@nestjs/swagger';
import { ProductsResponse } from '@repo/grpc/proto/products';
import { PaginationEntity } from './pagination.entity';
import { ProductEntity } from './product.entity';

export class ProductsEntity implements ProductsResponse {
  @ApiProperty({ isArray: true, type: ProductEntity })
  products!: ProductEntity[];

  @ApiProperty({ type: PaginationEntity })
  pagination!: PaginationEntity;
}
