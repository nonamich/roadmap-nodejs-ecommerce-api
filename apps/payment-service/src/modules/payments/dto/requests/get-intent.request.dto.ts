import { GetIntentRequest } from '@packages/grpc/pb/payment';
import { IsString } from 'class-validator';

export class GetIntentRequestDto implements GetIntentRequest {
  @IsString()
  intentId!: string;
}
