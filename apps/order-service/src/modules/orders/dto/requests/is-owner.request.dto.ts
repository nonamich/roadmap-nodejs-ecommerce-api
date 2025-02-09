import { IsOwnerRequest } from '@packages/grpc/pb/order';
import { IsString } from 'class-validator';

export class IsOwnerRequestDto implements IsOwnerRequest {
  @IsString()
  orderId!: string;

  @IsString()
  userId!: string;
}
