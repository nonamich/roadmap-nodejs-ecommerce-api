import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '@repo/grpc/proto/products';

export class PaginationEntity implements PaginationResponse {
  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  totalCount!: number;
}
