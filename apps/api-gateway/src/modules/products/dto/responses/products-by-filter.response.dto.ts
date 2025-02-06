import { ApiProperty } from '@nestjs/swagger';
import { BrandResponseDto } from './brand.response.dto';
import { CategoryResponseDto } from './category.response.dto';
import { ProductsResponseDto } from './products.response.dto';

export class ProductsByFilterResponseDto extends ProductsResponseDto {
  @ApiProperty({ type: BrandResponseDto, nullable: true })
  brand?: BrandResponseDto | null | undefined;

  @ApiProperty({ type: CategoryResponseDto, nullable: true })
  category?: CategoryResponseDto | null | undefined;
}
