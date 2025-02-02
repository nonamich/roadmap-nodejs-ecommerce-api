import { useMutation } from '@tanstack/react-query';
import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router';
import { cartsControllerGetCart, type CartResponseDto } from '~/api';
import {
  cartsControllerAddToCartMutation,
  cartsControllerRemoveFromCartMutation,
} from '~/api/@tanstack/react-query.gen';
import { useAuth } from '~/auth/hooks';
import { CartContext } from './cart.context';
import type { CartContextValue } from './cart.types';

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<CartResponseDto>({
    totalPrice: 0,
    totalQuantity: 0,
    items: [],
  });
  const { user } = useAuth();
  const addToCartMutation = useMutation(cartsControllerAddToCartMutation());
  const removeFromCartMutation = useMutation(
    cartsControllerRemoveFromCartMutation(),
  );

  const refreshCart = () => {
    setLoading(true);

    return cartsControllerGetCart({
      throwOnError: true,
    })
      .then(({ data }) => {
        setCart(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    refreshCart();
  }, [user]);

  const value: CartContextValue = {
    ...cart,
    loading,
    async remove(productId) {
      setLoading(true);

      removeFromCartMutation
        .mutateAsync({
          path: {
            productId,
          },
        })
        .then((response) => {
          setCart(response);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    async add(productId, addQuantity) {
      setLoading(true);

      if (!user) {
        navigate('/signin', {
          viewTransition: true,
        });

        return;
      }

      addToCartMutation
        .mutateAsync({
          path: {
            productId,
          },
          body: {
            quantity: addQuantity,
          },
        })
        .then((response) => {
          setCart(response);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    async refresh() {
      await refreshCart();
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
