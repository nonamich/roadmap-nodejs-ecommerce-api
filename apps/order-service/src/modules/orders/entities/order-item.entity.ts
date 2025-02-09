import { OrderItem } from '@prisma-client/index.js';

export class OrderItemEntity implements OrderItem {
  orderId!: string;
  productId!: string;
  quantity!: number;
  price!: number;
}
