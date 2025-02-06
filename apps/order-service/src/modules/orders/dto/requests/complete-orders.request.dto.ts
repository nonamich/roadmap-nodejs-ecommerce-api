import { IsString } from 'class-validator';

export class CompleteOrdersRequestDto {
  @IsString()
  intentId!: string;
}
