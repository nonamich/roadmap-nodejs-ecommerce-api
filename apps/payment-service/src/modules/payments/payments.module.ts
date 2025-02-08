import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrokerModule } from '@repo/broker';
import { StripeMethod } from './methods/stripe.method';
import { EventsBrokerController } from './payments.broker.controller';
import {} from './payments.constants';
import { PaymentsGrpcController } from './payments.grpc.controller';
import { PaymentsService } from './payments.service';
import { PaymentsWebhookController } from './payments.webhook.controller';

@Module({
  controllers: [
    PaymentsGrpcController,
    PaymentsWebhookController,
    EventsBrokerController,
  ],
  providers: [StripeMethod, PaymentsService],
  imports: [
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
export class PaymentsModule {}
