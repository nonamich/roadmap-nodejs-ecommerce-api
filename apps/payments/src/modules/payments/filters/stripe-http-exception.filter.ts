import Stripe from 'stripe';

import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch(Stripe.errors.StripeError)
export class StripeHttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: Stripe.errors.StripeError, host: ArgumentsHost): void {
    super.catch(
      new HttpException(
        exception.message,
        exception.statusCode || HttpStatus.UNPROCESSABLE_ENTITY,
      ),
      host,
    );
  }
}
