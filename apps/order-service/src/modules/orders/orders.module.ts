import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { BrokerModule } from '@repo/broker';
import { PriceService } from '@repo/shared/nest';
import { CartsModule } from '~/modules/carts/carts.module';
import { PaymentsModule } from '~/modules/payments/payments.module';
import { UsersModule } from '~/modules/users/users.module';
import { OrdersBrokerController } from './orders.broker.controller';
import { OrdersGrpcController } from './orders.grpc.controller';
import { OrdersRepository } from './orders.repository';
import { OrderService } from './orders.service';
import { OrdersSyncService } from './orders.sync.service';

@Module({
  controllers: [OrdersGrpcController, OrdersBrokerController],
  providers: [OrdersRepository, OrderService, OrdersSyncService, PriceService],
  imports: [
    ScheduleModule.forRoot(),
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
