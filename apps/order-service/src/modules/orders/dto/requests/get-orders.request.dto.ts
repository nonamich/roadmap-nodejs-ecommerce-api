import { GetOrdersRequest } from '@packages/grpc/pb/order';
import { IsString } from 'class-validator';

export class GetOrdersRequestDto implements GetOrdersRequest {
  @IsString()
  userId!: string;
}
