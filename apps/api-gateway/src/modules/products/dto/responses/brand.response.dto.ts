import { BrandResponse } from '@/grpc/pb/product';
import { ApiProperty } from '@nestjs/swagger';

export class BrandResponseDto implements BrandResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  name!: string;
}
