import { useMutation } from '@tanstack/react-query';
import type { FC, SyntheticEvent } from 'react';
import { Else, If, Then } from 'react-if';
import { useNavigate } from 'react-router';
import { ordersControllerAddOrderMutation } from '~/api/@tanstack/react-query.gen';
import { useCart } from '~/cart/hooks';
import { Button, CartItem } from '.';

export const Cart: FC = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const addToOrderMutation = useMutation(ordersControllerAddOrderMutation());
  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();

    const { id: orderId } = await addToOrderMutation.mutateAsync({
      body: {
        address: formData.get('address')!.toString(),
        phone: formData.get('phone')!.toString(),
      },
    });

    await navigate(`/orders/${orderId}`);

    await cart.refresh();
  };

  return (
    <section>
      <header>
        <h1 className="text-xl font-bold text-gray-200 sm:text-3xl">
          <If condition={cart.items.length}>
            <Then>Your Cart</Then>
            <Else>Your Cart Is Empty</Else>
          </If>
        </h1>
      </header>
      {!!cart.items.length && (
        <div className="mt-8">
          <ul className="space-y-4">
            {cart.items.map((item, index) => (
              <CartItem key={index} {...item} />
            ))}
          </ul>
          <div className="mt-8 flex justify-between border-t border-gray-900 pt-8">
            <form onSubmit={onSubmit}>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="Address"
                  className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800"
                >
                  <input
                    type="text"
                    id="Address"
                    name="address"
                    placeholder="Address"
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm dark:text-white"
                    required
                  />
                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-200">
                    Address
                  </span>
                </label>
                <label
                  htmlFor="Phone"
                  className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700 dark:bg-gray-800"
                >
                  <input
                    type="tel"
                    id="Phone"
                    name="phone"
                    placeholder="Email"
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm dark:text-white"
                    required
                  />
                  <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-gray-200">
                    Phone
                  </span>
                </label>
                <Button>Order</Button>
              </div>
            </form>
            <div className="space-y-4">
              <dl className="space-y-0.5 text-sm text-gray-100">
                <div className="flex justify-between !text-base font-medium">
                  <dt>Total: </dt>
                  <dd>
                    {new Intl.NumberFormat('en', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(cart.totalPrice)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
