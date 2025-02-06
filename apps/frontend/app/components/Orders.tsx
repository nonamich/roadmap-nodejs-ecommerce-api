import { useSuspenseQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { ordersControllerGetOrdersOptions } from '~/api/@tanstack/react-query.gen';
import { Button } from './Button';
import { Price } from './Price';

export const Orders: FC = () => {
  const { data: orders } = useSuspenseQuery(ordersControllerGetOrdersOptions());

  return (
    <>
      <header>
        <h1 className="mb-5 text-xl font-bold text-gray-200 sm:text-3xl">
          {orders.length ? <>Your Orders</> : <>Your Orders Is Empty</>}
        </h1>
      </header>
      {Boolean(orders.length) && (
        <div className="overflow-x-auto rounded">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Order ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Created At
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                  Status
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                      #{order.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {order.createdAt.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      <Price
                        price={order.items
                          .map(({ price, quantity }) => price * quantity)
                          .reduce((acc, item) => acc + item)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200">
                      {order.status === 'COMPLETED' ? (
                        <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 size-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>

                          <p className="whitespace-nowrap text-sm">Paid</p>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700 dark:bg-amber-700 dark:text-amber-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="-ms-1 me-1.5 size-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
                            ></path>
                          </svg>

                          <p className="whitespace-nowrap text-sm">
                            Waiting For Payment
                          </p>
                        </span>
                      )}
                    </td>
                    <td className="flex gap-2 whitespace-nowrap px-4 py-2">
                      <Button tag="a" to={`/order/${order.id}`}>
                        View
                      </Button>
                      {order.status === 'WAITING_FOR_PAYMENT' && (
                        <Button tag="a" to={`/order/payment/${order.id}`}>
                          Pay
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
