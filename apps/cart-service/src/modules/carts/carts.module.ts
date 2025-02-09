import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@packages/grpc/nest';
import {
  PRODUCT_CURRENT_PACKAGE,
  PRODUCT_SERVICE_NAME,
} from '@packages/grpc/pb/product';
import { PriceService } from '@packages/shared/nest';
import { CartItemsRepository } from './cart-items.repository';
import { CartsBrokerController } from './carts.broker.controller';
import { CartsGrpcController } from './carts.grpc.controller';
import { CartService } from './carts.service';

@Module({
  controllers: [CartsGrpcController, CartsBrokerController],
  providers: [CartService, CartItemsRepository, PriceService],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: PRODUCT_CURRENT_PACKAGE,
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
