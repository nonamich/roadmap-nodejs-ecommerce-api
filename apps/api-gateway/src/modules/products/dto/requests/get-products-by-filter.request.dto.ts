import { ApiProperty } from '@nestjs/swagger';
import { GetProductsByFilterRequest } from '@repo/grpc/pb/product';
import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiPropertyDeepObject } from '~/decorators';
import { GetProductsPaginationRequestDto } from './get-products-pagination.request.dto';

export class GetProductsByFilterRequestDto
  implements GetProductsByFilterRequest
{
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  brandSlug?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  categorySlug?: string;

  @ApiProperty({ type: GetProductsPaginationRequestDto })
  @ApiPropertyDeepObject()
  @ValidateNested()
  @IsObject()
  @Type(() => GetProductsPaginationRequestDto)
  pagination!: GetProductsPaginationRequestDto;
}
