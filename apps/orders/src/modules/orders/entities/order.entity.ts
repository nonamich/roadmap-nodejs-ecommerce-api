import { $Enums, Order } from 'prisma-client';
import { OrderItemEntity } from './order-item.entity';

export class OrderEntity implements Order {
  id!: number;
  userId!: number;
  intentId!: string;
  createdAt!: Date;
  status!: $Enums.OrderStatus;
  items!: OrderItemEntity[];
}
