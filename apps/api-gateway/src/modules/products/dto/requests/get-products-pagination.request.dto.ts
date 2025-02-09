import { ApiProperty } from '@nestjs/swagger';
import { GetProductsPaginationRequest } from '@packages/grpc/pb/product';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetProductsPaginationRequestDto
  implements GetProductsPaginationRequest
{
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsInt()
  page!: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsInt()
  limit!: number;
}
