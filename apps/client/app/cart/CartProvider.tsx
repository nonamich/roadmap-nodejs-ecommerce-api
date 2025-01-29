import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import {
  cartsControllerAddToCartMutation,
  cartsControllerGetCartQuantityOptions,
  cartsControllerRemoveProductMutation,
} from '~/api/@tanstack/react-query.gen';
import { useAuth } from '~/auth/hooks';
import { CartContext } from './cart.context';
import type { CartContextValue } from './cart.types';

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const quantityQuery = useQuery(
    user
      ? cartsControllerGetCartQuantityOptions()
      : { queryKey: [], queryFn: async () => ({ quantity: 0 }) },
  );
  const addToCartMutation = useMutation(cartsControllerAddToCartMutation());
  const removeProductMutation = useMutation(
    cartsControllerRemoveProductMutation(),
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    quantityQuery.refetch();
  }, [user, quantityQuery]);

  useEffect(() => {
    if (!quantityQuery.data?.quantity) {
      return;
    }

    setQuantity(quantityQuery.data.quantity);
  }, [quantityQuery]);

  const value: CartContextValue = {
    quantity,
    loading,
    async remove(productId) {
      const cart = await removeProductMutation.mutateAsync({
        body: {
          productId,
        },
      });
    },
    async add(productId, addQuantity) {
      setLoading(true);

      addToCartMutation
        .mutateAsync({
          body: {
            quantity: addQuantity,
            productId,
          },
        })
        .then(({ quantity }) => {
          setQuantity(quantity);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
