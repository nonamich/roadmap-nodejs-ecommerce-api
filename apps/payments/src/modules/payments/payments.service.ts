import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcInternalException } from '@repo/grpc/nest';
import Stripe from 'stripe';
import { CreateIntentRequestDto, GetIntentRequestDto } from './dto';
import { StripeMethod } from './methods/stripe.method';
import { PAYMENTS_STRIPE_CURRENCY } from './payments.constants';

@Injectable()
export class PaymentsService {
  readonly webhookWhsec: string;

  constructor(
    private readonly stripe: StripeMethod,
    config: ConfigService,
  ) {
    this.webhookWhsec = config.getOrThrow('STRIPE_WEBHOOK_WHSEC');
  }

  async createIntent({ amountInCent }: CreateIntentRequestDto) {
    const intent = await this.stripe.paymentIntents.create({
      amount: amountInCent,
      currency: PAYMENTS_STRIPE_CURRENCY,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      intentId: intent.id,
    };
  }

  async processWebhook(
    payload: string | Buffer,
    signature: string | Buffer | Array<string>,
  ) {
    const event = await this.stripe.webhooks.constructEventAsync(
      payload,
      signature,
      this.webhookWhsec,
    );

    if (event.type === 'payment_intent.succeeded') {
      await this.onSucceededPaymentIntent(event);
    }
  }

  async onSucceededPaymentIntent(event: Stripe.PaymentIntentSucceededEvent) {
    const paymentIntent = event.data.object;

    if (paymentIntent.status !== 'succeeded') {
      return;
    }

    // this.ordersService.createOrder(paymentIntent.status);
  }

  async getIntent({ intentId }: GetIntentRequestDto) {
    const intent = await this.stripe.paymentIntents.retrieve(intentId);

    if (!intent.client_secret) {
      throw new GrpcInternalException('intent has no client_secret');
    }

    return {
      clientSecret: intent.client_secret,
      amount: intent.amount,
      status: intent.status,
      currency: intent.currency,
    };
  }
}
