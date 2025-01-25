import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequest } from '@packages/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginationRequestDto implements PaginationRequest {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsInt()
  page!: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsInt()
  limit!: number;
}
