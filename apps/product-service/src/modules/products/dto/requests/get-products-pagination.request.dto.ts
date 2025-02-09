import { GetProductsPaginationRequest } from '@packages/grpc/pb/product';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetProductsPaginationRequestDto
  implements GetProductsPaginationRequest
{
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page!: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit!: number;
}
