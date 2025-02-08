import { Transform, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { UserEventDto } from './user.event.dto';

export class OrderCompletedEventDto {
  @IsString()
  orderId!: string;

  @IsNumber()
  totalPrice!: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  createdAt!: Date;

  @Type(() => UserEventDto)
  @ValidateNested()
  user!: UserEventDto;
}
