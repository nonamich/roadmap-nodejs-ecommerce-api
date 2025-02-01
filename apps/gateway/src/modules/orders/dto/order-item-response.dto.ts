import { ApiProperty } from '@nestjs/swagger';
import { OrderItemResponse } from '@packages/grpc/proto/orders';

export class OrderItemResponseDto implements OrderItemResponse {
  @ApiProperty()
  productId!: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  price!: number;
}
