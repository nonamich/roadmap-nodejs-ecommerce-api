import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PAYMENTS_STRIPE_API_VERSION } from '../payments.constants';

@Injectable()
export class StripeMethod extends Stripe {
  constructor(config: ConfigService) {
    super(config.getOrThrow('STRIPE_SECRET_KEY'), {
      apiVersion: PAYMENTS_STRIPE_API_VERSION,
      typescript: true,
    });
  }
}
