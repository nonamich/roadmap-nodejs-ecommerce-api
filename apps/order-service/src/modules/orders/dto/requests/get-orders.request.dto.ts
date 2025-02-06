import { GetOrdersRequest } from '@repo/grpc/pb/order';
import { IsString } from 'class-validator';

export class GetOrdersRequestDto implements GetOrdersRequest {
  @IsString()
  userId!: string;
}
