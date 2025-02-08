import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrokerModule } from '@/broker';
import { NotificationsModule } from '../notifications/notifications.module';
import { EventsBrokerController } from './events.broker.controller';

@Module({
  controllers: [EventsBrokerController],
  imports: [
    NotificationsModule,
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
export class EventsModule {}
