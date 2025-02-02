import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe, type BaseStripeElementsOptions } from '@stripe/stripe-js';
import { useSuspenseQuery } from '@tanstack/react-query';
import type { FC, SyntheticEvent } from 'react';
import { Navigate } from 'react-router';
import { type OrderResponseDto } from '~/api';
import { paymentsControllerGetIntentOptions } from '~/api/@tanstack/react-query.gen';
import { Button } from './Button';

const options: BaseStripeElementsOptions = {
  appearance: {
    theme: 'night',
  },
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

type Props = OrderResponseDto;

export const Payment: FC<Props> = ({ intentId }) => {
  const { data: intent } = useSuspenseQuery(
    paymentsControllerGetIntentOptions({
      path: {
        intentId,
      },
    }),
  );

  if (intent.status === 'succeeded') {
    return <Navigate to="/order/succeeded" />;
  }

  return (
    <>
      <Elements
        stripe={stripePromise}
        options={{ clientSecret: intent.clientSecret, ...options }}
      >
        <PaymentForm />
      </Elements>
    </>
  );
};

const PaymentForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: new URL(`/order/succeeded`, location.origin).toString(),
      },
    });
  };

  if (!elements || !stripe) {
    return <></>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="mt-5">
        <Button type="submit" disabled={!stripe}>
          Buy
        </Button>
      </div>
    </form>
  );
};
