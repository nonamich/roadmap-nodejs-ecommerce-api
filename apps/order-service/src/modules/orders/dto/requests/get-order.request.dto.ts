import { GetOrderRequest } from '@repo/grpc/pb/order';
import { IsString } from 'class-validator';

export class GetOrderRequestDto implements GetOrderRequest {
  @IsString()
  orderId!: string;
}
