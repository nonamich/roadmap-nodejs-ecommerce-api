import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@repo/grpc/nest';
import {
  PRODUCTS_PACKAGE_NAME,
  PRODUCTS_SERVICE_NAME,
} from '@repo/grpc/proto/products';
import { CartItemsRepository } from './cart-items.repository';
import { CartsBrokerController } from './carts.broker.controller';
import { CartsGrpcController } from './carts.grpc.controller';
import { CartsService } from './carts.service';

@Module({
  controllers: [CartsGrpcController, CartsBrokerController],
  providers: [CartsService, CartItemsRepository],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: PRODUCTS_PACKAGE_NAME,
      serviceNameAndToken: PRODUCTS_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVER_URL_PRODUCTS'),
        };
      },
    }),
  ],
})
export class CartsModule {}
