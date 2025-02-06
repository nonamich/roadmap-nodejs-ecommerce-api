import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrokerModule } from '@repo/broker';
import { GrpcClientModule } from '@repo/grpc/nest';
import { CARTS_PACKAGE_NAME, CARTS_SERVICE_NAME } from '@repo/grpc/proto/carts';
import {
  PAYMENTS_PACKAGE_NAME,
  PAYMENTS_SERVICE_NAME,
} from '@repo/grpc/proto/payments';
import { OrdersBrokerController } from './orders.broker.controller';
import { OrdersGrpcController } from './orders.grpc.controller';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersGrpcController, OrdersBrokerController],
  providers: [OrdersRepository, OrdersService],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: CARTS_PACKAGE_NAME,
      serviceNameAndToken: CARTS_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVER_URL_CARTS'),
        };
      },
    }),
    GrpcClientModule.registerAsync({
      packageName: PAYMENTS_PACKAGE_NAME,
      serviceNameAndToken: PAYMENTS_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVER_URL_PAYMENTS'),
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
