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
  @IsOptional()
  categoryId?: number;

  @IsInt()
  @IsOptional()
  brandId?: number;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetProductsPaginationRequestDto)
  pagination!: GetProductsPaginationRequestDto;
}
