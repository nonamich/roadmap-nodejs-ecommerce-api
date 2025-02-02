import { ApiProperty, OmitType } from '@nestjs/swagger';
import { OrderProductsItemEntity } from './order-products-item.entity';
import { OrderEntity } from './order.entity';

export class OrderProductsEntity extends OmitType(OrderEntity, ['items']) {
  @ApiProperty({ type: OrderProductsItemEntity, isArray: true })
  items!: OrderProductsItemEntity[];
}
