import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, type FC, type PropsWithChildren } from 'react';
import { cartsControllerGetCartQuantityOptions } from '~/api/@tanstack/react-query.gen';
import { useAuth } from '~/auth/hooks';
import { CartContext } from './cart.context';
import type { CartContextValue } from './cart.types';

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [quantity, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { data, refetch } = useQuery(
    user
      ? cartsControllerGetCartQuantityOptions()
      : { queryKey: [], queryFn: async () => ({ quantity: 0 }) },
  );

  cosnt V

  useEffect(() => {
    if (!user) {
      return;
    }

    refetch();
  }, [user, refetch]);

  useEffect(() => {
    if (!data) {
      return;
    }

    setCount(data.quantity);
  }, [data]);

  const value: CartContextValue = {
    quantity,
    loading,
    async add(productId) {
      setLoading(true);

      productId = productId + productId;

      setLoading(false);
    },
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
