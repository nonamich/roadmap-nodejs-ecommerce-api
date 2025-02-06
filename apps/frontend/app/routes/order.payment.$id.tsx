import {
  data as createError,
  Navigate,
  useLoaderData,
  type ClientLoaderFunctionArgs,
} from 'react-router';
import { ordersControllerGetOrder } from '~/api';

import { Payment } from '~/components';

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  if (!params.id) {
    throw createError('Not Found', 404);
  }

  const { data: order } = await ordersControllerGetOrder({
    throwOnError: true,
    path: {
      orderId: params.id,
    },
  });

  return order;
}

export default function OrderPayment() {
  const order = useLoaderData<typeof clientLoader>();

  return (
    <>
      {order.status === 'WAITING_FOR_PAYMENT' && <Payment {...order} />}
      {order.status === 'COMPLETED' && <Navigate to="/order/succeeded" />}
    </>
  );
}
