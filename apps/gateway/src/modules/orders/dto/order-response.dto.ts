import { ApiProperty } from '@nestjs/swagger';
import { OrderItemResponse, OrderResponse } from '@packages/grpc/proto/orders';

export class OrderItemResponseDto implements OrderItemResponse {
  @ApiProperty()
  productId!: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty()
  price!: number;
}

export class OrderResponseDto implements OrderResponse {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  address!: string;

  @ApiProperty()
  phone!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  status!: string;

  @ApiProperty({ type: OrderItemResponseDto, isArray: true })
  items!: OrderItemResponseDto[];
}
