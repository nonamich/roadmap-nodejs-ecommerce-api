import { ApiProperty } from '@nestjs/swagger';
import { ProductResponse } from '@packages/grpc/pb/product';
import { BrandResponseDto } from './brand.response.dto';
import { CategoryResponseDto } from './category.response.dto';

export class ProductResponseDto implements ProductResponse {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  image!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ required: false, nullable: true, type: Number })
  rating?: number | null | undefined;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty()
  brand!: BrandResponseDto;

  @ApiProperty()
  category!: CategoryResponseDto;
}
