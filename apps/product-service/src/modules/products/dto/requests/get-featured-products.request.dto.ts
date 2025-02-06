import { GetFeaturedProductsRequest } from '@repo/grpc/pb/product';
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
