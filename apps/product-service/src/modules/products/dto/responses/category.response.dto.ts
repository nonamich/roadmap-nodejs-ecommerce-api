import { CategoryResponse } from '@repo/grpc/proto/products';

export class CategoryResponseDto implements CategoryResponse {
  id!: number;
  name!: string;
}
