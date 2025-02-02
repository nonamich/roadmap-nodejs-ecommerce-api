import type { FC } from 'react';
import type { ProductResponseEntity } from '~/api';

type Props = Pick<ProductResponseEntity, 'price'>;

export const Price: FC<Props> = ({ price }) => {
  return (
    <>
      {new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
      }).format(price)}
    </>
  );
};
