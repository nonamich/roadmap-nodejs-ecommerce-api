import { GetProductsByFilterRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { GetProductsPaginationRequestDto } from './get-products-pagination.request.dto';

export class GetProductsByFilterRequestDto
  implements GetProductsByFilterRequest
{
  @IsString()
  @IsOptional()
  categorySlug?: string;

  @IsString()
  @IsOptional()
  brandSlug?: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => GetProductsPaginationRequestDto)
  pagination!: GetProductsPaginationRequestDto;
}
