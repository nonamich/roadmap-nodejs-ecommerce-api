import { CategoryResponse } from '@packages/grpc/pb/product';

export class CategoryResponseDto implements CategoryResponse {
  id!: string;
  name!: string;
  slug!: string;
}
