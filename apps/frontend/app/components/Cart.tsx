import { useMutation } from '@tanstack/react-query';
import type { FC } from 'react';
import { Else, If, Then } from 'react-if';
import { useNavigate } from 'react-router';
import { ordersControllerAddOrderMutation } from '~/api/@tanstack/react-query.gen';
import { useCart } from '~/cart/hooks';
import { Button, CartItem, Price } from '.';

export const Cart: FC = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const addToOrderMutation = useMutation(ordersControllerAddOrderMutation());
  const onSubmit = async () => {
    const { id } = await addToOrderMutation.mutateAsync({});

    await navigate(`/order/payment/${id}`, {
      viewTransition: true,
    });

    setTimeout(() => {
      cart.refresh();
    }, 1000);
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
            <Button onClick={onSubmit} disabled={addToOrderMutation.isPending}>
              Order
            </Button>
            <div className="space-y-4">
              <dl className="space-y-0.5 text-sm text-gray-100">
                <div className="flex justify-between !text-base font-medium">
                  <dt>Total: </dt>
                  <dd>
                    <Price price={cart.totalPrice} />
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
