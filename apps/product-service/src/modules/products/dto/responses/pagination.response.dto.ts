import { PaginationResponse } from '@repo/grpc/pb/product';

export class PaginationResponseDto implements PaginationResponse {
  page!: number;
  limit!: number;
  totalCount!: number;
}
