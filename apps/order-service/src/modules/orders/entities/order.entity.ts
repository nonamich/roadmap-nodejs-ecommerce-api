import { $Enums, Order } from '@packages/shared/db/order';
import { OrderItemEntity } from './order-item.entity';

export class OrderEntity implements Order {
  id!: string;
  userId!: string;
  intentId!: string;
  createdAt!: Date;
  status!: $Enums.OrderStatus;
  items!: OrderItemEntity[];
}
