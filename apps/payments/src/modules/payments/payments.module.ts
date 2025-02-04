import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcClientModule } from '@repo/grpc/nest';
import {
  ORDERS_PACKAGE_NAME,
  ORDERS_SERVICE_NAME,
} from '@repo/grpc/proto/orders';
import { StripeMethod } from './methods/stripe.method';
import {} from './payments.constants';
import { PaymentsGrpcController } from './payments.grpc.controller';
import { PaymentsService } from './payments.service';
import { PaymentsWebhookController } from './payments.webhook.controller';

@Module({
  controllers: [PaymentsGrpcController, PaymentsWebhookController],
  imports: [
    GrpcClientModule.registerAsync({
      packageName: ORDERS_PACKAGE_NAME,
      serviceNameAndToken: ORDERS_SERVICE_NAME,
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          url: config.getOrThrow('GRPC_SERVER_URL_ORDERS'),
        };
      },
    }),
  ],
  providers: [StripeMethod, PaymentsService],
})
export class PaymentsModule {}
