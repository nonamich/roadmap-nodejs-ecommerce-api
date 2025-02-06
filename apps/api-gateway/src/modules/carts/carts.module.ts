import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@repo/grpc/nest';
import { CARTS_PACKAGE_NAME, CARTS_SERVICE_NAME } from '@repo/grpc/proto/carts';
import { ProductsModule } from '../products/products.module';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

@Module({
  controllers: [CartsController],
  exports: [GrpcClientModule],
  providers: [CartsService],
  imports: [
    ProductsModule,
    GrpcClientModule.registerAsync({
      packageName: CARTS_PACKAGE_NAME,
      serviceNameAndToken: CARTS_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVICE_URL_CART'),
        };
      },
    }),
  ],
})
export class CartsModule {}
