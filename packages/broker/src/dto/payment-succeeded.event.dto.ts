import { IsString } from 'class-validator';

export class PaymentSucceededEventDto {
  @IsString()
  intentId!: string;
}
