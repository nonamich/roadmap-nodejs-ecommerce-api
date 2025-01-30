import { ApiProperty } from '@nestjs/swagger';
import { CartItemResponse } from '@packages/grpc/proto/carts';
import { ProductResponseDto } from '~/modules/products/dto/product-response.dto';

export class CartItemResponseDto implements CartItemResponse {
  @ApiProperty()
  productId!: number;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty({ type: ProductResponseDto })
  product!: ProductResponseDto;
}
