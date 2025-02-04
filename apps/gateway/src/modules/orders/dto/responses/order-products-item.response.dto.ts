import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '~/modules/products/dto/responses';
import { OrderItemResponseDto } from './order-item.response.dto';

export class OrderProductsItemResponseDto extends OrderItemResponseDto {
  @ApiProperty({ type: ProductResponseDto })
  product!: ProductResponseDto;
}
