import { ApiProperty } from '@nestjs/swagger';
import { GetProductBySlugRequest } from '@/grpc/pb/product';
import { IsString } from 'class-validator';

export class GetProductBySlugRequestDto implements GetProductBySlugRequest {
  @IsString()
  @ApiProperty()
  slug!: string;
}
