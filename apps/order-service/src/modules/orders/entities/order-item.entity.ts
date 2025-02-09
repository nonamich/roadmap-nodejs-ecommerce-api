import { OrderItem } from '@prisma/client/order/index.js';

export class OrderItemEntity implements OrderItem {
  orderId!: string;
  productId!: string;
  quantity!: number;
  price!: number;
}
