import { OrderItem } from 'prisma-client';

export class OrderItemEntity implements OrderItem {
  orderId!: number;
  productId!: number;
  quantity!: number;
  price!: number;
}
