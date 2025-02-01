import {
  data as createError,
  useLoaderData,
  type ClientLoaderFunctionArgs,
} from 'react-router';
import { ordersControllerGetOrder, paymentsControllerGetIntentClientSecret, type ConformationResponseDto } from '~/api';
import { Breadcrumbs } from '~/components';
import { OrderDetails } from '~/components';

import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, type BaseStripeElementsOptions } from '@stripe/stripe-js';
import { useEffect, useState, type FC, type SyntheticEvent } from 'react';

const options: BaseStripeElementsOptions = {
  appearance: {
    theme: 'night'
  }
}

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  if (!params.intentId) {
    throw createError('Not Found', 404);
  }

  const { data } = await paymentsControllerGetIntentClientSecret({
    throwOnError: true,
    path: {
      intentId: params.intentId,
    },

  });

  return data;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const PaymentForm: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/success',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        Оплатити
      </button>
    </form>
  );
}

export default function OrderConfirmation() {
  const data = useLoaderData<typeof clientLoader>();

  return (
    <>
      <Elements stripe={stripePromise} options={{clientSecret: data.clientSecret, ...options}}>
        <PaymentForm />
      </Elements>
    </>
  );
}
