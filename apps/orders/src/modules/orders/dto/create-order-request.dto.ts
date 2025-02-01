import { CreateOrderRequest } from '@packages/grpc/proto/orders';
import { IsInt } from 'class-validator';

export class CreateOrderRequestDto implements CreateOrderRequest {
  @IsInt()
  userId!: number;
}
