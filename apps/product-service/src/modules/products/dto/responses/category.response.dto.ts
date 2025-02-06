import { CategoryResponse } from '@repo/grpc/pb/product';

export class CategoryResponseDto implements CategoryResponse {
  id!: string;
  name!: string;
  slug!: string;
}
