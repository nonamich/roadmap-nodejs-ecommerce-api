import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { GetProductsByFilterRequest } from '@packages/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, ValidateNested } from 'class-validator';
import { PaginationRequestDto } from './pagination-request.dto';

@ApiExtraModels()
export class GetProductsByFilterRequestDto
  implements GetProductsByFilterRequest
{
  @ApiProperty({ type: PaginationRequestDto })
  @ValidateNested({ each: true })
  @Type(() => PaginationRequestDto)
  pagination!: PaginationRequestDto;

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
}
