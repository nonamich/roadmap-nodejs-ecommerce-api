import { ApiProperty, OmitType } from '@nestjs/swagger';
import { OrderProductsItemResponseDto, OrderResponseDto } from '.';

export class OrderProductsResponseDto extends OmitType(OrderResponseDto, [
  'items',
]) {
  @ApiProperty({ type: OrderProductsItemResponseDto, isArray: true })
  items!: OrderProductsItemResponseDto[];
}
