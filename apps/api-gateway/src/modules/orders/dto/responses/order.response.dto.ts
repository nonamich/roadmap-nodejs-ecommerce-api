import { ApiProperty } from '@nestjs/swagger';
import { OrderResponse, OrderStatus } from '@repo/grpc/pb/order';
import { OrderItemResponseDto } from './order-item.response.dto';

export class OrderResponseDto implements OrderResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ enum: OrderStatus })
  status!: OrderStatus;

  @ApiProperty()
  intentId!: string;

  @ApiProperty({ type: OrderItemResponseDto, isArray: true })
  items!: OrderItemResponseDto[];
}
