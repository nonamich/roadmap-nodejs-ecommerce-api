import { CreateIntentRequest } from '@/grpc/pb/payment';
import { IsInt } from 'class-validator';

export class CreateIntentRequestDto implements CreateIntentRequest {
  @IsInt()
  amountInCent!: number;
}
