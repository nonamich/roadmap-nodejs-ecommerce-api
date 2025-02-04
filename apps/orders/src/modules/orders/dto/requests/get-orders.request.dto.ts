import { GetOrdersRequest } from '@repo/grpc/proto/orders';
import { IsInt } from 'class-validator';

export class GetOrdersRequestDto implements GetOrdersRequest {
  @IsInt()
  userId!: number;
}
