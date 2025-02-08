import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrokerModule } from '@repo/broker';
import { CartsModule } from '~/modules/carts/carts.module';
import { PaymentsModule } from '~/modules/payments/payments.module';
import { UsersModule } from '~/modules/users/users.module';
import { OrdersBrokerController } from './orders.broker.controller';
import { OrdersGrpcController } from './orders.grpc.controller';
import { OrdersRepository } from './orders.repository';
import { OrderService } from './orders.service';

@Module({
  controllers: [OrdersGrpcController, OrdersBrokerController],
  providers: [OrdersRepository, OrderService],
  imports: [
    CartsModule,
    PaymentsModule,
    UsersModule,
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
