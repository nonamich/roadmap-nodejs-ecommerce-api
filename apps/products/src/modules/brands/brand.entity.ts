import { Brand } from '@repo/grpc/proto/products';

export class BrandEntity implements Brand {
  id!: number;
  name!: string;
}
