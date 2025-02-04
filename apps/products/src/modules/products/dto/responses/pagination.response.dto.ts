import { PaginationResponse } from '@repo/grpc/proto/products';

export class PaginationResponseDto implements PaginationResponse {
  page!: number;
  limit!: number;
  totalCount!: number;
}
