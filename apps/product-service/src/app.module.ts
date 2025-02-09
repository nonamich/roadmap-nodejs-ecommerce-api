import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BrandsModule } from '~/modules/brands/brands.module';
import { CategoriesModule } from '~/modules/categories/categories.module';
import { ORMModule } from '~/modules/orm/orm.module';
import { ProductsModule } from '~/modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ORMModule.forRoot({
      isGlobal: true,
    }),
    BrandsModule,
    CategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}
