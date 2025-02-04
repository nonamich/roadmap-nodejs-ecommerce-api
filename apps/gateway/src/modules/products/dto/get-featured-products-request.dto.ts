import { ApiProperty } from '@nestjs/swagger';
import { GetFeaturedProductsRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { ApiPropertyDeepObject } from '~/decorators';
import { PaginationRequestDto } from './pagination.request.dto';

export class GetFeaturedProductsRequestDto
  implements GetFeaturedProductsRequest
{
  @ApiProperty({ type: PaginationRequestDto })
  @ApiPropertyDeepObject()
  @ValidateNested()
  @IsObject()
  @Type(() => PaginationRequestDto)
  pagination!: PaginationRequestDto;
}
