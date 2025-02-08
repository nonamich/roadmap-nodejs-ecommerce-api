import { GetOrdersRequest } from '@/grpc/pb/order';
import { IsString } from 'class-validator';

export class GetOrdersRequestDto implements GetOrdersRequest {
  @IsString()
  userId!: string;
}
