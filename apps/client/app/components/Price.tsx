import type { FC } from 'react';
import type { ProductResponseDto } from '~/api';

type Props = Pick<ProductResponseDto, 'price'>;

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
