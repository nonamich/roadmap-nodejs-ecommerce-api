import { GetFeaturedProductsRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsObject, ValidateNested } from 'class-validator';
import { PaginationRequestDto } from '.';

export class GetFeaturedProductsRequestDto
  implements GetFeaturedProductsRequest
{
  @ValidateNested()
  @IsObject()
  @Type(() => PaginationRequestDto)
  pagination!: PaginationRequestDto;
}
