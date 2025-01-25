import type { FC } from 'react';
import type { ProductResponseDto } from '~/api';

type Props = Pick<ProductResponseDto, 'price' | 'currency'>;

export const Price: FC<Props> = ({ price, currency }) => {
  return (
    <>
      {new Intl.NumberFormat('en', {
        style: 'currency',
        currency: currency,
      }).format(price)}
    </>
  );
};
