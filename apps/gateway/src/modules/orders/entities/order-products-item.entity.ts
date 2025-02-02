import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '~/modules/products/entities';
import { OrderItemEntity } from './order-item.entity';

export class OrderProductsItemEntity extends OrderItemEntity {
  @ApiProperty({ type: ProductEntity })
  product!: ProductEntity;
}
