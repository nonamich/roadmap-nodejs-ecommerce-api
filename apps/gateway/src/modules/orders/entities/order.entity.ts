import { ApiProperty } from '@nestjs/swagger';
import { OrderResponse, OrderStatus } from '@repo/grpc/proto/orders';
import { OrderItemEntity } from './order-item.entity';

export class OrderEntity implements OrderResponse {
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

  @ApiProperty({ type: OrderItemEntity, isArray: true })
  items!: OrderItemEntity[];
}
