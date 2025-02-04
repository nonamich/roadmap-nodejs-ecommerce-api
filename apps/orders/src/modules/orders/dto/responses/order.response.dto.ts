import { OrderResponse, OrderStatus } from '@repo/grpc/proto/orders';
import { OrderItemResponseDto } from './orders-item.response.dto';

export class OrderResponseDto implements OrderResponse {
  id!: number;
  status!: OrderStatus;
  intentId!: string;
  createdAt!: Date;
  items!: OrderItemResponseDto[];
  userId!: number;
}
