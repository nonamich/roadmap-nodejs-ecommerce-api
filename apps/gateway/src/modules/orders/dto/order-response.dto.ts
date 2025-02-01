import { ApiProperty } from '@nestjs/swagger';
import { OrderResponse } from '@packages/grpc/proto/orders';
import { OrderItemResponseDto } from './order-item-response.dto';

export class OrderResponseDto implements OrderResponse {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  userId!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  indentId!: string;

  @ApiProperty({ type: OrderItemResponseDto, isArray: true })
  items!: OrderItemResponseDto[];
}
