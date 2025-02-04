import { GetFeaturedProductsRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { GetProductsPaginationRequestDto } from '.';

export class GetFeaturedProductsRequestDto
  implements GetFeaturedProductsRequest
{
  @ValidateNested()
  @IsObject()
  @Type(() => GetProductsPaginationRequestDto)
  pagination!: GetProductsPaginationRequestDto;
}
