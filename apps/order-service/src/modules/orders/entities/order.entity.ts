import { $Enums, Order } from '@prisma-client/index.js';
import { OrderItemEntity } from './order-item.entity';

export class OrderEntity implements Order {
  id!: string;
  userId!: string;
  intentId!: string;
  createdAt!: Date;
  status!: $Enums.OrderStatus;
  items!: OrderItemEntity[];
}
