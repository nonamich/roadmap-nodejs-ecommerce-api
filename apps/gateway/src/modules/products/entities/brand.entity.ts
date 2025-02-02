import { ApiProperty } from '@nestjs/swagger';
import { Brand } from '@repo/grpc/proto/products';

export class BrandEntity implements Brand {
  @ApiProperty()
  id!: number;
  @ApiProperty()
  name!: string;
}
