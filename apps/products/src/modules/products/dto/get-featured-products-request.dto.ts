import { GetFeaturedProductsRequest } from '@packages/grpc/proto/products';
import { PaginationRequestDto } from '.';

export class GetFeaturedProductsRequestDto
  implements GetFeaturedProductsRequest
{
  pagination!: PaginationRequestDto;
}
