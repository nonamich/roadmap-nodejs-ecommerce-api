import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { GrpcInvalidArgumentException } from '@packages/grpc/nest';
import { Observable } from 'rxjs';
import Stripe from 'stripe';

@Catch(Stripe.errors.StripeError)
export class StripeGrpcExceptionFilter extends BaseRpcExceptionFilter {
  catch(
    exception: Stripe.errors.StripeError,
    host: ArgumentsHost,
  ): Observable<unknown> {
    return super.catch(
      new GrpcInvalidArgumentException(exception.message),
      host,
    );
  }
}
