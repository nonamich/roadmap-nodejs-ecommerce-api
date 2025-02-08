import { PaginationResponse } from '@/grpc/pb/product';

export class PaginationResponseDto implements PaginationResponse {
  page!: number;
  limit!: number;
  totalCount!: number;
}
