import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@repo/grpc/nest';
import {
  ORDERS_PACKAGE_NAME,
  ORDERS_SERVICE_NAME,
} from '@repo/grpc/proto/orders';
import { ProductsModule } from '~/modules/products/products.module';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  exports: [GrpcClientModule],
  imports: [
    ProductsModule,
    GrpcClientModule.registerAsync({
      packageName: ORDERS_PACKAGE_NAME,
      serviceName: ORDERS_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVER_URL_ORDERS'),
        };
      },
    }),
  ],
})
export class OrdersModule {}
