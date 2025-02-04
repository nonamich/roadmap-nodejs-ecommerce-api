import { ApiProperty } from '@nestjs/swagger';
import { GetProductsByFilterRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsInt, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { ApiPropertyDeepObject } from '~/decorators';
import { PaginationRequestDto } from './pagination.request.dto';

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

  @ApiProperty({ type: PaginationRequestDto })
  @ApiPropertyDeepObject()
  @ValidateNested()
  @IsObject()
  @Type(() => PaginationRequestDto)
  pagination!: PaginationRequestDto;
}
