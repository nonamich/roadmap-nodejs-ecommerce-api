import { OrderItem } from '@packages/shared/db/order';

export class OrderItemEntity implements OrderItem {
  orderId!: string;
  productId!: string;
  quantity!: number;
  price!: number;
}
