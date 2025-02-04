import { GetProductsByFilterRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { GetProductsPaginationRequestDto } from './get-products-pagination.request.dto';

export class GetProductsByFilterRequestDto
  implements GetProductsByFilterRequest
{
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  categoryId?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  brandId?: number;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetProductsPaginationRequestDto)
  pagination!: GetProductsPaginationRequestDto;
}
