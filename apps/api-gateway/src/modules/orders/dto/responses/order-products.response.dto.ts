import { ApiProperty, OmitType } from '@nestjs/swagger';
import { OrderProductsItemResponseDto } from './order-products-item.response.dto';
import { OrderResponseDto } from './order.response.dto';

export class OrderProductsResponseDto extends OmitType(OrderResponseDto, [
  'items',
]) {
  @ApiProperty({ type: OrderProductsItemResponseDto, isArray: true })
  items!: OrderProductsItemResponseDto[];
}
