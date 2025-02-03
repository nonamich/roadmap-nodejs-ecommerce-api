import { ApiProperty } from '@nestjs/swagger';
import { ProductsByFilterResponse } from '@repo/grpc/proto/products';
import { BrandEntity } from './brand.entity';
import { CategoryEntity } from './category.entity';
import { ProductsEntity } from './products.entity';

export class ProductsByFilterEntity
  extends ProductsEntity
  implements ProductsByFilterResponse
{
  @ApiProperty({ type: BrandEntity, nullable: true })
  brand?: BrandEntity | null | undefined;

  @ApiProperty({ type: CategoryEntity, nullable: true })
  category?: CategoryEntity | null | undefined;
}
