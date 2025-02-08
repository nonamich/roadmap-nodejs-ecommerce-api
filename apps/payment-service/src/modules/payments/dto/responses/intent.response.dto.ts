import { IntentResponse, PaymentStatus } from '@/grpc/pb/payment';

export class IntentResponseDto implements IntentResponse {
  id!: string;
  amount!: number;
  currency!: string;
  clientSecret!: string;
  status!: PaymentStatus;
}
