import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ORMModule } from './modules/orm/orm.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ORMModule.forRoot({
      isGlobal: true,
    }),
    OrdersModule,
    CartsModule,
    PaymentsModule,
    UsersModule,
  ],
})
export class AppModule {}
