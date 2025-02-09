import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@packages/grpc/nest';
import { CART_PACKAGE_NAME, CART_SERVICE_NAME } from '@packages/grpc/pb/cart';
import { ProductsModule } from '../products/products.module';
import { CartsController } from './carts.controller';
import { CartService } from './carts.service';

@Module({
  controllers: [CartsController],
  exports: [GrpcClientModule],
  providers: [CartService],
  imports: [
    ProductsModule,
    GrpcClientModule.registerAsync({
      packageName: CART_PACKAGE_NAME,
      serviceNameAndToken: CART_SERVICE_NAME,
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
