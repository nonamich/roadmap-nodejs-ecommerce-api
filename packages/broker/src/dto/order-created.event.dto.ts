import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';

export class OrderItemsCreatedEventDto {
  @IsString()
  productId!: string;

  @IsInt()
  quantity!: number;
}

export class OrderCreatedEventDto {
  @IsString()
  orderId!: string;

  @IsString()
  userId!: string;

  @Type(() => OrderItemsCreatedEventDto)
  @ValidateNested()
  products!: OrderItemsCreatedEventDto[];
}
