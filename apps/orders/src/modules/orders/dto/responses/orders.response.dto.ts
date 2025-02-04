import { OrdersResponse } from '@repo/grpc/proto/orders';
import { OrderResponseDto } from './order.response.dto';

export class OrdersResponseDto implements OrdersResponse {
  orders!: OrderResponseDto[];
}
