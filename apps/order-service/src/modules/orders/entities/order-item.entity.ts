import { OrderItem } from 'prisma-client';

export class OrderItemEntity implements OrderItem {
  orderId!: string;
  productId!: string;
  quantity!: number;
  price!: number;
}
