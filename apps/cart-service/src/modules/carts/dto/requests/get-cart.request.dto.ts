import { GetCartRequest } from '@repo/grpc/pb/cart';
import { IsString } from 'class-validator';

export class GetCartRequestDto implements GetCartRequest {
  @IsString()
  userId!: string;
}
