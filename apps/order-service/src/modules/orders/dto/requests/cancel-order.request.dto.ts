import { CancelOrderRequest } from '@repo/grpc/pb/order';
import { IsString } from 'class-validator';

export class CancelOrderRequestDto implements CancelOrderRequest {
  @IsString()
  orderId!: string;
}
