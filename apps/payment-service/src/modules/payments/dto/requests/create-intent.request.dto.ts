import { CreateIntentRequest } from '@repo/grpc/proto/payments';
import { IsInt } from 'class-validator';

export class CreateIntentRequestDto implements CreateIntentRequest {
  @IsInt()
  amountInCent!: number;
}
