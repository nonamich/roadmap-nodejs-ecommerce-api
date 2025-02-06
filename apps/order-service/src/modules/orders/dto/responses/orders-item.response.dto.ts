import { OrderItemResponse } from '@repo/grpc/proto/orders';

export class OrderItemResponseDto implements OrderItemResponse {
  productId!: number;
  quantity!: number;
  price!: number;
}
