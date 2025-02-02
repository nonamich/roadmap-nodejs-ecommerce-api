import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@repo/grpc/proto/products';

export class CategoryEntity implements Category {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  name!: string;
}
