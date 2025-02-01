import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PaymentMethod } from '../interfaces/payment-method.interface';
import { PAYMENTS_STRIPE_API_VERSION } from '../payments.constants';

@Injectable()
export class StripeMethod extends Stripe implements PaymentMethod {
  constructor(config: ConfigService) {
    super(config.getOrThrow('STRIPE_SECRET_KEY'), {
      apiVersion: PAYMENTS_STRIPE_API_VERSION,
      typescript: true,
    });
  }
}
