import { ApiProperty } from '@nestjs/swagger';
import { CartItemResponse } from '@/grpc/pb/cart';
import { ProductResponseDto } from '~/modules/products/dto/responses';

export class CartItemResponseDto implements CartItemResponse {
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  quantity!: number;

  @ApiProperty({ type: ProductResponseDto })
  product!: ProductResponseDto;
}
