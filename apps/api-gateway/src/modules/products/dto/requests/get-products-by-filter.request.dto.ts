import { ApiProperty } from '@nestjs/swagger';
import { GetProductsByFilterRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsInt, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { ApiPropertyDeepObject } from '~/decorators';
import { GetProductsPaginationRequestDto } from './get-products-pagination.request.dto';

export class GetProductsByFilterRequestDto
  implements GetProductsByFilterRequest
{
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  brandId?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  categoryId?: number;

  @ApiProperty({ type: GetProductsPaginationRequestDto })
  @ApiPropertyDeepObject()
  @ValidateNested()
  @IsObject()
  @Type(() => GetProductsPaginationRequestDto)
  pagination!: GetProductsPaginationRequestDto;
}
