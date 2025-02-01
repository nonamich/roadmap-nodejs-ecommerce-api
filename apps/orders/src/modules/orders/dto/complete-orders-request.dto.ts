import { CompleteOrdersRequest } from '@packages/grpc/proto/orders';
import { IsString } from 'class-validator';

export class CompleteOrdersRequestDto implements CompleteOrdersRequest {
  @IsString()
  indentId!: string;
}
