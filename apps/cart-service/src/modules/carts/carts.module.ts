import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@/grpc/nest';
import {
  PRODUCT_PACKAGE_NAME,
  PRODUCT_SERVICE_NAME,
} from '@/grpc/pb/product';
import { PriceService } from '@/shared/nest';
import { CartItemsRepository } from './cart-items.repository';
import { CartsBrokerController } from './carts.broker.controller';
import { CartsGrpcController } from './carts.grpc.controller';
import { CartService } from './carts.service';

@Module({
  controllers: [CartsGrpcController, CartsBrokerController],
  providers: [CartService, CartItemsRepository, PriceService],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: PRODUCT_PACKAGE_NAME,
      serviceNameAndToken: PRODUCT_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVICE_URL_PRODUCT'),
        };
      },
    }),
  ],
})
export class CartsModule {}
