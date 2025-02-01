import { PaginationRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginationRequestDto implements PaginationRequest {
  @IsInt()
  @Type(() => Number)
  page!: number;

  @IsInt()
  @Type(() => Number)
  limit!: number;
}
