import { GetOrderByIntentIdRequest } from '@repo/grpc/pb/order';
import { IsInt } from 'class-validator';

export class GetOrderByIntentIdRequestDto implements GetOrderByIntentIdRequest {
  @IsInt()
  intentId!: string;
}
