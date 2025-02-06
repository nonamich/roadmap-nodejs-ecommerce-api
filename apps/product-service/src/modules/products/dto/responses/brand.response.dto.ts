import { BrandResponse } from '@repo/grpc/pb/product';

export class BrandResponseDto implements BrandResponse {
  id!: string;
  name!: string;
  slug!: string;
}
