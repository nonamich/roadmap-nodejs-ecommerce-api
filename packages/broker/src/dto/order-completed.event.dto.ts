import { IsDate, IsInt, IsString } from 'class-validator';

export class OrderCompletedEventDto {
  @IsString()
  orderId!: string;

  @IsInt()
  totalPrice!: number;

  @IsString()
  userId!: string;

  @IsDate()
  createdAt!: Date;
}
