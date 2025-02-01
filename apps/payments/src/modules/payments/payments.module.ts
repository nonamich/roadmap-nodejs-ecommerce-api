import { Module } from '@nestjs/common';
import { StripeMethod } from './methods/stripe.method';
import { PaymentsGrpcController } from './payments.grpc.controller';
import { PaymentsService } from './payments.service';
import { PaymentsWebhookController } from './payments.webhook.controller';

@Module({
  controllers: [PaymentsGrpcController, PaymentsWebhookController],
  providers: [StripeMethod, PaymentsService],
})
export class PaymentsModule {}
