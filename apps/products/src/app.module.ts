import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './filters/prisma-client-exception.filter';
import { ORMModule } from './modules/orm/orm.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
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
