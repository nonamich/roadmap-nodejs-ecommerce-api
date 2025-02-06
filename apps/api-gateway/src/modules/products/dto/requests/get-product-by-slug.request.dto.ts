import { ApiProperty } from '@nestjs/swagger';
import { GetProductBySlugRequest } from '@repo/grpc/proto/products';
import { IsString } from 'class-validator';

export class GetProductBySlugRequestDto implements GetProductBySlugRequest {
  @IsString()
  @ApiProperty()
  slug!: string;
}
