import Stripe from 'stripe';

import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(Stripe.errors.StripeError)
export class StripeExceptionFilter extends BaseExceptionFilter {
  catch(exception: Stripe.errors.StripeError, host: ArgumentsHost) {
    return super.catch(
      new HttpException(
        exception.message,
        exception.statusCode || HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      host,
    );
  }
}
