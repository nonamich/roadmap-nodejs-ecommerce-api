import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrokerService } from '@repo/broker';
import Stripe from 'stripe';
import { CreateIntentRequestDto, GetIntentRequestDto } from './dto/requests';
import { IntentResponseDto } from './dto/responses';
import { StripeMethod } from './methods/stripe.method';
import { IntentModel } from './models';
import { PAYMENTS_STRIPE_CURRENCY } from './payments.constants';

@Injectable()
export class PaymentsService {
  readonly webhookWhsec: string;

  constructor(
    private readonly stripe: StripeMethod,
    private readonly brokerService: BrokerService,
    config: ConfigService,
  ) {
    this.webhookWhsec = config.getOrThrow('STRIPE_WEBHOOK_WHSEC');
  }

  async createIntent({
    amountInCent,
  }: CreateIntentRequestDto): Promise<IntentResponseDto> {
    const intent = await this.stripe.paymentIntents.create({
      amount: amountInCent,
      currency: PAYMENTS_STRIPE_CURRENCY,
      payment_method_types: ['card'],
    });

    return IntentModel.createResponseDtoFromIntent(intent);
  }

  async processWebhook(
    payload: string | Buffer,
    signature: string | Buffer | Array<string>,
  ): Promise<void> {
    const event = await this.stripe.webhooks.constructEventAsync(
      payload,
      signature,
      this.webhookWhsec,
    );

    if (event.type === 'payment_intent.succeeded') {
      await this.onSucceededIntentPayment(event);
    }
  }

  async onSucceededIntentPayment(
    event: Stripe.PaymentIntentSucceededEvent,
  ): Promise<void> {
    const {
      data: { object: intent },
    } = event;

    this.brokerService.emit('payment.succeeded', { intentId: intent.id });
  }

  async getIntent({
    intentId,
  }: GetIntentRequestDto): Promise<IntentResponseDto> {
    const intent = await this.stripe.paymentIntents.retrieve(intentId);

    return IntentModel.createResponseDtoFromIntent(intent);
  }
}
