import { ApiProperty } from '@nestjs/swagger';
import { OrderItemResponse } from '@repo/grpc/proto/orders';

export class OrderItemEntity implements OrderItemResponse {
  @ApiProperty()
  productId!: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  price!: number;
}
