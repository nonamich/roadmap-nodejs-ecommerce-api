import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';

export class OrderItemsCreatedEventDto {
  @IsInt()
  productId!: number;

  @IsInt()
  quantity!: number;
}

export class OrderCreatedEventDto {
  @IsInt()
  userId!: number;

  @Type(() => OrderItemsCreatedEventDto)
  @ValidateNested()
  products!: OrderItemsCreatedEventDto[];
}
