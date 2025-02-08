import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class OrderEventDto {
  @IsString()
  orderId!: string;

  @IsString()
  userId!: string;

  @IsString()
  intentId!: string;

  @IsNumber()
  totalPrice!: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  createdAt!: Date;
}
