import { CancelOrderRequest } from '@packages/grpc/pb/order';
import { IsString } from 'class-validator';

export class CancelOrderRequestDto implements CancelOrderRequest {
  @IsString()
  orderId!: string;
}
