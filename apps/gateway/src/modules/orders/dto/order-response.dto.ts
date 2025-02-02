import { ApiProperty } from '@nestjs/swagger';
import { OrderResponse, OrderStatus } from '@repo/grpc/proto/orders';
import { OrderItemResponseDto } from './order-item-response.dto';

export class OrderResponseDto implements OrderResponse {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ enum: OrderStatus })
  status!: OrderStatus;

  @ApiProperty()
  intentId!: string;

  @ApiProperty({ type: OrderItemResponseDto, isArray: true })
  items!: OrderItemResponseDto[];
}
