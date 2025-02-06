import { OrdersResponse } from '@repo/grpc/pb/order';
import { OrderResponseDto } from './order.response.dto';

export class OrdersResponseDto implements OrdersResponse {
  orders!: OrderResponseDto[];
}
