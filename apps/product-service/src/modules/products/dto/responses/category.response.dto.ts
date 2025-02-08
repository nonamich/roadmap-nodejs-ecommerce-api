import { CategoryResponse } from '@/grpc/pb/product';

export class CategoryResponseDto implements CategoryResponse {
  id!: string;
  name!: string;
  slug!: string;
}
