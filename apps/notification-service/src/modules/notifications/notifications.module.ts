import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BrokerModule } from '@repo/broker';
import { UsersModule } from '../users/users.module';
import { NotificationsBrokerController } from './notifications.broker.controller';
import { notificationsConfig } from './notifications.config';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsBrokerController],
  providers: [NotificationsService],
  imports: [
    UsersModule,
    ConfigModule.forFeature(notificationsConfig),
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
export class NotificationsModule {}
