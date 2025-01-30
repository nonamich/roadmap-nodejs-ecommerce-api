import { ApiProperty } from '@nestjs/swagger';
import { ProductResponseDto } from '~/modules/products/dto';
import { OrderItemResponseDto, OrderResponseDto } from '.';

export class OrderProductsItemResponseDto extends OrderItemResponseDto {
  @ApiProperty({ type: ProductResponseDto })
  product!: ProductResponseDto;
}

export class OrderProductsResponseDto extends OrderResponseDto {
  @ApiProperty({ type: OrderProductsItemResponseDto, isArray: true })
  declare items: OrderProductsItemResponseDto[];
}
