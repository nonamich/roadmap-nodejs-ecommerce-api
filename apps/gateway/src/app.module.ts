import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  GrpcServerExceptionFilter,
  GrpcToHttpInterceptor,
} from 'nestjs-grpc-exceptions';
import { AuthModule } from './modules/auth/auth.module';
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
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
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
  ],
})
export class AppModule {}
