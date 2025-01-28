import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CartsModule } from './modules/carts/carts.module';
import { ORMModule } from './modules/orm/orm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ORMModule.forRoot({
      isGlobal: true,
    }),
    CartsModule,
  ],
})
export class AppModule {}
