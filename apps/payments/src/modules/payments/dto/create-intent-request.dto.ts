import { CreateIntentRequest } from '@packages/grpc/proto/payments';
import { IsInt } from 'class-validator';

export class CreateIntentRequestDto implements CreateIntentRequest {
  @IsInt()
  amountInCent!: number;
}
