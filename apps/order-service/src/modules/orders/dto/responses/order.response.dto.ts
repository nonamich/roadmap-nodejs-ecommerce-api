import { OrderResponse, OrderStatus } from '@repo/grpc/pb/order';
import { OrderItemResponseDto } from './orders-item.response.dto';

export class OrderResponseDto implements OrderResponse {
  id!: string;
  status!: OrderStatus;
  intentId!: string;
  createdAt!: Date;
  items!: OrderItemResponseDto[];
  userId!: string;
}
