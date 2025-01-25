import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequest } from '@packages/grpc/proto/products';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PaginationRequestDto implements PaginationRequest {
  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  page!: number;

  @Type(() => Number)
  @IsInt()
  @ApiProperty()
  limit!: number;
}
