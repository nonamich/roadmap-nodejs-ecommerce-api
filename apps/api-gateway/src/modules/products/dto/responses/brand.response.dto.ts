import { ApiProperty } from '@nestjs/swagger';
import { BrandResponse } from '@repo/grpc/proto/products';

export class BrandResponseDto implements BrandResponse {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  name!: string;
}
