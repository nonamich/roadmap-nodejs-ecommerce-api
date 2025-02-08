import { ApiProperty } from '@nestjs/swagger';
import { PaginationResponse } from '@/grpc/pb/product';

export class PaginationResponseDto implements PaginationResponse {
  @ApiProperty()
  page!: number;

  @ApiProperty()
  limit!: number;

  @ApiProperty()
  totalCount!: number;
}
