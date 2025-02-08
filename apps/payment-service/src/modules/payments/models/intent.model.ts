import { GrpcInternalException } from '@/grpc/nest';
import Stripe from 'stripe';
import { IntentResponseDto } from '../dto/responses';

export class IntentModel {
  static createResponseDtoFromIntent(
    intent: Stripe.PaymentIntent,
  ): IntentResponseDto {
    if (!intent.client_secret) {
      throw new GrpcInternalException('intent has no client_secret');
    }

    return {
      id: intent.id,
      clientSecret: intent.client_secret,
      amount: intent.amount,
      status: intent.status,
      currency: intent.currency,
    };
  }
}
