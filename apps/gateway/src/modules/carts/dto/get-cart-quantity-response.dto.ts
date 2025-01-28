import { ApiProperty } from '@nestjs/swagger';
import { GetCartQuantityResponse } from '@packages/grpc/proto/carts';

export class GetCartQuantityResponseDto implements GetCartQuantityResponse {
  @ApiProperty()
  quantity!: number;
}
