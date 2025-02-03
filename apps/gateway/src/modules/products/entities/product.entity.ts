import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@repo/grpc/proto/products';
import { BrandEntity } from './brand.entity';
import { CategoryEntity } from './category.entity';

export class ProductEntity implements Product {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  image!: string;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  description!: string;

  @ApiProperty({ required: false, nullable: true, type: Number })
  rating?: number | null | undefined;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty()
  brand!: BrandEntity;

  @ApiProperty()
  category!: CategoryEntity;
}
