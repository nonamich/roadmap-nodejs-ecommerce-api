import { PaginationRequest } from '@packages/grpc/proto/products';
import { IsInt } from 'class-validator';

export class PaginationRequestDto implements PaginationRequest {
  @IsInt()
  page!: number;

  @IsInt()
  limit!: number;
}
