import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponse } from '@repo/grpc/proto/products';

export class CategoryResponseDto implements CategoryResponse {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  name!: string;
}
