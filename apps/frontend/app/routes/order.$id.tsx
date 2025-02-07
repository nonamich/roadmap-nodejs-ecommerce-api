import {
  data as createError,
  useLoaderData,
  type ClientLoaderFunctionArgs,
} from 'react-router';
import { ordersControllerGetOrder } from '~/api';
import { Breadcrumbs, OrderDetails } from '~/components';

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  if (!params.id) {
    throw createError('Not Found', 404);
  }

  const { data } = await ordersControllerGetOrder({
    throwOnError: true,
    path: {
      orderId: params.id,
    },
  });

  return data;
}

export default function Brand() {
  const order = useLoaderData<typeof clientLoader>();

  return (
    <>
      <Breadcrumbs
        links={[
          {
            href: '/orders',
            text: 'Orders',
          },
          {
            text: `#${order.id.toString()}`,
          },
        ]}
      />
      <h1 className="mb-5 text-xl font-bold text-gray-200 sm:text-3xl">
        Order: #{order.id}
      </h1>
      <OrderDetails order={order} />
    </>
  );
}
