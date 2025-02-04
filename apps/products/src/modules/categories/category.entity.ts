import { Category } from '@repo/grpc/proto/products';

export class CategoryEntity implements Category {
  id!: number;
  name!: string;
}
