import { IsString } from 'class-validator';

export class CompleteOrderRequestDto {
  @IsString()
  intentId!: string;
}
