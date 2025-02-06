import { ApiProperty } from '@nestjs/swagger';
import { OrderItemResponse } from '@repo/grpc/pb/order';

export class OrderItemResponseDto implements OrderItemResponse {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  price!: number;
}
