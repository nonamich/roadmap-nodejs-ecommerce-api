import { GetOrderRequest } from '@repo/grpc/proto/orders';
import { IsInt } from 'class-validator';

export class GetOrderRequestDto implements GetOrderRequest {
  @IsInt()
  orderId!: number;
}
