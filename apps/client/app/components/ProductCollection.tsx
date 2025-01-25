import type { FC } from 'react';
import type { GetProductsByFilterResponseDto } from '~/api';
import { Pagination, type Props as PaginationProps } from './Pagination';
import { ProductItem } from './ProductItem';

type Props = GetProductsByFilterResponseDto & PaginationProps;

export const ProductCollection: FC<Props> = ({ products, ...pagination }) => {
  return (
    <section>
      <div className="mt-8">
        <p className="text-sm text-gray-500">
          Showing{' '}
          <span>
            {' '}
            {Math.min(
              pagination.totalCount,
              pagination.take * pagination.page,
            )}{' '}
          </span>{' '}
          of {pagination.totalCount}
        </p>
      </div>
      <div className="mx-auto max-w-screen-xl">
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => {
            return (
              <li key={index}>
                <ProductItem product={product} />
              </li>
            );
          })}
        </ul>
        <Pagination {...pagination} />
      </div>
    </section>
  );
};
