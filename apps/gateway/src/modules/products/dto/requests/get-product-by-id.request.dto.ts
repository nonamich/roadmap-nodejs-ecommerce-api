import { ApiProperty } from '@nestjs/swagger';
import { GetProductByIdRequest } from '@repo/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetProductByIdRequestDto implements GetProductByIdRequest {
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  id!: number;
}
