import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrokerModule } from '@repo/broker';
import { GrpcClientModule } from '@repo/grpc/nest';
import { CART_PACKAGE_NAME, CART_SERVICE_NAME } from '@repo/grpc/pb/cart';
import {
  PAYMENT_PACKAGE_NAME,
  PAYMENT_SERVICE_NAME,
} from '@repo/grpc/pb/payment';
import { OrdersBrokerController } from './orders.broker.controller';
import { OrdersGrpcController } from './orders.grpc.controller';
import { OrdersRepository } from './orders.repository';
import { OrderService } from './orders.service';

@Module({
  controllers: [OrdersGrpcController, OrdersBrokerController],
  providers: [OrdersRepository, OrderService],
  imports: [
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
    GrpcClientModule.registerAsync({
      packageName: PAYMENT_PACKAGE_NAME,
      serviceNameAndToken: PAYMENT_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVICE_URL_PAYMENT'),
        };
      },
    }),
    BrokerModule.registerAsync({
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('MQTT_URL'),
        };
      },
    }),
  ],
})
export class OrdersModule {}
