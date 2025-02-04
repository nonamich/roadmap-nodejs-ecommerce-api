import { GetProductsPaginationRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetProductsPaginationRequestDto
  implements GetProductsPaginationRequest
{
  @IsInt()
  @Type(() => Number)
  page!: number;

  @IsInt()
  @Type(() => Number)
  limit!: number;
}
