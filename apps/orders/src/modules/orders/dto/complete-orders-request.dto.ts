import { CompleteOrdersRequest } from '@repo/grpc/proto/orders';
import { IsString } from 'class-validator';

export class CompleteOrdersRequestDto implements CompleteOrdersRequest {
  @IsString()
  indentId!: string;
}
