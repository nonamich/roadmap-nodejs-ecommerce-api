import { GrpcInternalException } from '@repo/grpc/nest';
import Stripe from 'stripe';

export class IntentModel {
  id: string;
  clientSecret: string;
  amount: number;
  status: Stripe.PaymentIntent.Status;
  currency: string;

  constructor({ id, clientSecret, amount, status, currency }: IntentModel) {
    this.id = id;
    this.clientSecret = clientSecret;
    this.amount = amount;
    this.status = status;
    this.currency = currency;
  }

  static createFromIntent(
    intent: Stripe.Response<Stripe.PaymentIntent>,
  ): IntentModel {
    if (!intent.client_secret) {
      throw new GrpcInternalException('intent has no client_secret');
    }

    return new IntentModel({
      id: intent.id,
      clientSecret: intent.client_secret,
      amount: intent.amount,
      status: intent.status,
      currency: intent.currency,
    });
  }
}
