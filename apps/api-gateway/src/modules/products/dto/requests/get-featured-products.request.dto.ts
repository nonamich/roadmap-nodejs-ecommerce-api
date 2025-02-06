import { ApiProperty } from '@nestjs/swagger';
import { GetFeaturedProductsRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { ApiPropertyDeepObject } from '~/decorators';
import { GetProductsPaginationRequestDto } from './get-products-pagination.request.dto';

export class GetFeaturedProductsRequestDto
  implements GetFeaturedProductsRequest
{
  @ApiProperty({ type: GetProductsPaginationRequestDto })
  @ApiPropertyDeepObject()
  @ValidateNested()
  @IsObject()
  @Type(() => GetProductsPaginationRequestDto)
  pagination!: GetProductsPaginationRequestDto;
}
