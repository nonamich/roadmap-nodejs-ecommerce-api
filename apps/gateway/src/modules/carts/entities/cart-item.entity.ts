import { ApiProperty } from '@nestjs/swagger';
import { CartItemResponse } from '@repo/grpc/proto/carts';
import { ProductEntity } from '~/modules/products/entities';

export class CartItemEntity implements CartItemResponse {
  @ApiProperty()
  productId!: number;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty({ type: ProductEntity })
  product!: ProductEntity;
}
