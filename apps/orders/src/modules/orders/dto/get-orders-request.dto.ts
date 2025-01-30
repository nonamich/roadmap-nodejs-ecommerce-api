import { GetOrdersRequest } from '@packages/grpc/proto/orders';
import { IsInt } from 'class-validator';

export class GetOrdersRequestDto implements GetOrdersRequest {
  @IsInt()
  userId!: number;
}
