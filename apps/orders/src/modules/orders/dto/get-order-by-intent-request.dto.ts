import { GetOrderByIntentIdRequest } from '@repo/grpc/proto/orders';
import { IsInt } from 'class-validator';

export class GetOrderByIntentIdRequestDto implements GetOrderByIntentIdRequest {
  @IsInt()
  intentId!: string;
}
