import { ApiProperty } from '@nestjs/swagger';
import { BrandResponse } from '@repo/grpc/pb/product';

export class BrandResponseDto implements BrandResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  name!: string;
}
