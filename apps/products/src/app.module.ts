import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { ORMModule } from './modules/orm/orm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ORMModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
  ],
})
export class AppModule {}
