import { ApiProperty } from '@nestjs/swagger';
import { GetProductBySlugRequest } from '@packages/grpc/pb/product';
import { IsString } from 'class-validator';

export class GetProductBySlugRequestDto implements GetProductBySlugRequest {
  @IsString()
  @ApiProperty()
  slug!: string;
}
