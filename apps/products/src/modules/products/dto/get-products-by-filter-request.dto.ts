import { GetProductsByFilterRequest } from '@packages/grpc/proto/products';
import { IsInt, IsOptional } from 'class-validator';
import { PaginationRequestDto } from './pagination-request.dto';

export class GetProductsByFilterRequestDto
  implements GetProductsByFilterRequest
{
  @IsInt()
  @IsOptional()
  categoryId?: number;

  @IsInt()
  @IsOptional()
  brandId?: number;

  pagination!: PaginationRequestDto;
}
