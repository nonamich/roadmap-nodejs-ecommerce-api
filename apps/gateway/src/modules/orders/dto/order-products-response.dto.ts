import { ApiProperty, OmitType } from '@nestjs/swagger';
import { OrderResponseDto } from './order-response.dto';
import { OrderProductsItemResponseDto } from './order-products-item-response.dto';


export class OrderProductsResponseDto extends OmitType(OrderResponseDto, [
  'items',
]) {
  @ApiProperty({ type: OrderProductsItemResponseDto, isArray: true })
  items!: OrderProductsItemResponseDto[];
}
