import { useSuspenseQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { Else, If, Then } from 'react-if';
import { cartsControllerGetCartOptions } from '~/api/@tanstack/react-query.gen';
import { CartItem } from './CartItem';

export const Cart: FC = () => {
  const {
    data: { items, totalPrice },
  } = useSuspenseQuery(cartsControllerGetCartOptions());

  return (
    <section>
      <header>
        <h1 className="text-xl font-bold text-gray-200 sm:text-3xl">
          <If condition={items.length}>
            <Then>Your Cart</Then>
            <Else>Your Cart Is Empty</Else>
          </If>
        </h1>
      </header>
      {!!items.length && (
        <div className="mt-8">
          <ul className="space-y-4">
            {items.map((item, index) => (
              <CartItem key={index} {...item} />
            ))}
          </ul>
          <div className="mt-8 flex justify-end border-t border-gray-900 pt-8">
            <div className="space-y-4">
              <dl className="space-y-0.5 text-sm text-gray-100">
                <div className="flex justify-between !text-base font-medium">
                  <dt>Total: </dt>
                  <dd>
                    {new Intl.NumberFormat('en', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(totalPrice)}
                  </dd>
                </div>
              </dl>

              <div className="flex justify-end">
                <a
                  href="#"
                  className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                >
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
