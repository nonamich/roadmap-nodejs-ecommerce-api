import { OrderItemResponse } from '@repo/grpc/proto/orders';

export class OrderItemEntity implements OrderItemResponse {
  productId!: number;
  quantity!: number;
  price!: number;
}
