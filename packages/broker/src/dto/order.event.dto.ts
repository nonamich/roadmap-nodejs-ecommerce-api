import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsInt,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class OrderItemEventDto {
  @IsString()
  productId!: string;

  @IsInt()
  quantity!: number;

  @IsNumber()
  price!: number;
}

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

  @Type(() => OrderItemEventDto)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  items!: OrderItemEventDto[];
}
