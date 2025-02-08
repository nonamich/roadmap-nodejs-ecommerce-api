import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponse } from '@/grpc/pb/product';

export class CategoryResponseDto implements CategoryResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  name!: string;
}
