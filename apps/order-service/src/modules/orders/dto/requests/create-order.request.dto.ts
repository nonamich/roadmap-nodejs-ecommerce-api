import { CreateOrderRequest } from '@repo/grpc/pb/order';
import { IsString } from 'class-validator';

export class CreateOrderRequestDto implements CreateOrderRequest {
  @IsString()
  userId!: string;
}
