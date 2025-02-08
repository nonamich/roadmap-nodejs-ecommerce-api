import { IsString } from 'class-validator';

export class PaymentCanceledEventDto {
  @IsString()
  intentId!: string;
}
