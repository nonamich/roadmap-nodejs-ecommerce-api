import { RemoveFromCartRequest } from '@packages/grpc/pb/cart';
import { IsString } from 'class-validator';

export class RemoveFromCartRequestDto implements RemoveFromCartRequest {
  @IsString()
  userId!: string;

  @IsString()
  productId!: string;
}
