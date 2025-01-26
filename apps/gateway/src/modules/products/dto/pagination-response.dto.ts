import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '@packages/grpc/proto/products';

export class PaginationResponseDto implements PaginationResponse {
  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  totalCount!: number;
}
