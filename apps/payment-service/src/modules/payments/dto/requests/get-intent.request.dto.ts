import { GetIntentRequest } from '@/grpc/pb/payment';
import { IsString } from 'class-validator';

export class GetIntentRequestDto implements GetIntentRequest {
  @IsString()
  intentId!: string;
}
