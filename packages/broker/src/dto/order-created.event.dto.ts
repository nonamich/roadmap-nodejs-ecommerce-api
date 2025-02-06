import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';

export class OrderItemsCreatedEventDto {
  @IsInt()
  productId!: string;

  @IsInt()
  quantity!: number;
}

export class OrderCreatedEventDto {
  @IsInt()
  orderId!: string;

  @IsInt()
  userId!: string;

  @Type(() => OrderItemsCreatedEventDto)
  @ValidateNested()
  products!: OrderItemsCreatedEventDto[];
}
