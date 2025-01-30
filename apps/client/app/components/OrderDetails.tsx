import type { FC } from 'react';
import { Link } from 'react-router';
import type { OrderProductsResponseDto } from '~/api';
import { Price } from './Price';

type Props = {
  order: OrderProductsResponseDto;
};

export const OrderDetails: FC<Props> = ({ order }) => {
  return (
    <>
      <p className="text-xl">Order Details:</p>
      <div className="my-5 flow-root">
        <dl className="-my-3 divide-y divide-gray-100 text-sm dark:divide-gray-700">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">ID</dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              #{order.id}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">
              Created At
            </dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              {order.createdAt.toLocaleString()}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">
              Status
            </dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              {order.status}
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">
              Address
            </dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              <address>{order.address}</address>
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">
              Order Price
            </dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              <Price
                price={order.items.reduce((acc, item) => {
                  return acc + item.price * item.quantity;
                }, 0)}
              />
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900 dark:text-white">Phone</dt>
            <dd className="text-gray-700 sm:col-span-2 dark:text-gray-200">
              <a href={`tel:${order.phone}`}>{order.phone}</a>
            </dd>
          </div>
        </dl>
      </div>
      <p className="text-xl">Products:</p>
      <div className="mt-5 overflow-x-auto rounded">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm dark:divide-gray-700 dark:bg-gray-900">
          <thead className="text-left">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Title
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Quantity
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {order.items.map(({ product, quantity }) => {
              return (
                <tr key={product.id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    <Link to={`/product/${product.id}`}>{product.title}</Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    <Price price={product.price} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    {quantity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white">
                    <Price price={product.price * quantity} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
