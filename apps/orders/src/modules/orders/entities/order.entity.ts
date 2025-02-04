import { OrderResponse, OrderStatus } from '@repo/grpc/proto/orders';
import { OrderItemEntity } from './order-item.entity';

export class OrderEntity implements OrderResponse {
  id!: number;
  status!: OrderStatus;
  userId!: number;
  intentId!: string;
  createdAt!: Date;
  items!: OrderItemEntity[];
}
