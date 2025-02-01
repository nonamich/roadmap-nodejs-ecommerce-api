import { ApiProperty } from '@nestjs/swagger';
import { ProductsByFilterResponse } from '@repo/grpc/proto/products';
import {
  BrandDto,
  CategoryDto,
  ProductsResponseDto,
} from './product-response.dto';

export class ProductsByFilterResponseDto
  extends ProductsResponseDto
  implements ProductsByFilterResponse
{
  @ApiProperty({ type: BrandDto })
  brand?: BrandDto;

  @ApiProperty({ type: CategoryDto })
  category?: CategoryDto;
}
