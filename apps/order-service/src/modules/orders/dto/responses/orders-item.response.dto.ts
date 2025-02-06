import { OrderItemResponse } from '@repo/grpc/pb/order';

export class OrderItemResponseDto implements OrderItemResponse {
  productId!: string;
  quantity!: number;
  price!: number;
}
