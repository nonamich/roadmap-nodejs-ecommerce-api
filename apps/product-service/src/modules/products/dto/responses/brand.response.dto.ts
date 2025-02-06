import { BrandResponse } from '@repo/grpc/proto/products';

export class BrandResponseDto implements BrandResponse {
  id!: string;
  name!: string;
  slug!: string;
}
