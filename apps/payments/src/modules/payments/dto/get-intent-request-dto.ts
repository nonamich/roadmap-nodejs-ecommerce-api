import { GetIntentRequest } from '@packages/grpc/proto/payments';
import { IsString } from 'class-validator';

export class GetIntentRequestDto implements GetIntentRequest {
  @IsString()
  intentId!: string;
}
