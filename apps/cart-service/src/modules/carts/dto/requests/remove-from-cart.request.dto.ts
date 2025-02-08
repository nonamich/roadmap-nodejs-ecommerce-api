import { RemoveCartRequest } from '@/grpc/pb/cart';
import { IsString } from 'class-validator';

export class RemoveCartRequestDto implements RemoveCartRequest {
  @IsString()
  userId!: string;
}
