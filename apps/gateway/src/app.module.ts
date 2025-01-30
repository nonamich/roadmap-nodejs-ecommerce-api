import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { GrpcToHttpInterceptor } from '@packages/grpc/nest';
import { AuthModule } from './modules/auth/auth.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { DefaultValidationPipe } from './pipes/default-validation.pipe';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: DefaultValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GrpcToHttpInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
  ],
})
export class AppModule {}
