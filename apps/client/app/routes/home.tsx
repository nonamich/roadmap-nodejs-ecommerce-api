import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { productsControllerGetProductsByFilterOptions } from '~/api/@tanstack/react-query.gen';
import { ProductCollection } from '~/components';

export default function Home() {
  const [page] = useState(1);
  const TAKE = 8;
  const response = useQuery(
    productsControllerGetProductsByFilterOptions({
      query: {
        page: page,
        take: TAKE,
      },
    }),
  );

  if (!response.data) {
    return <></>;
  }

  return (
    <>
      <ProductCollection
        totalCount={response.data.totalCount}
        page={page}
        take={TAKE}
        products={response.data.products}
      />
    </>
  );
}
