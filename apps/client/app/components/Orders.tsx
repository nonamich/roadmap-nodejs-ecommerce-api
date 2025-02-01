import { useSuspenseQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { Else, If, Then } from 'react-if';
import { ordersControllerGetOrdersOptions } from '~/api/@tanstack/react-query.gen';
import { Button } from './Button';
import { Price } from './Price';

export const Orders: FC = () => {
  const { data: orders } = useSuspenseQuery(ordersControllerGetOrdersOptions());

  return (
    <>
      <header>
        <h1 className="mb-5 text-xl font-bold text-gray-200 sm:text-3xl">
          <If condition={orders.length}>
            <Then>Your Orders</Then>
            <Else>Your Orders Is Empty</Else>
          </If>
        </h1>
      </header>
      <If condition={orders.length}>
        <Then>
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
                        {order.status.toString()}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <Button tag="a" to={`/orders/${order.id}`}>
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Then>
      </If>
    </>
  );
};
