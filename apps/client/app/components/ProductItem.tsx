import type { FC } from 'react';
import { Link } from 'react-router';
import type { ProductResponseEntity } from '~/api';
import { Price } from './Price';

type Props = {
  product: ProductResponseEntity;
};

export const ProductItem: FC<Props> = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} viewTransition className="group block">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />
      </div>
      <div className="relative pt-3">
        <h3 className="text-xs text-gray-100 group-hover:underline group-hover:underline-offset-4">
          {product.title}
        </h3>
        <p className="mt-2">
          <span className="tracking-wider text-gray-100">
            <Price {...product} />
          </span>
        </p>
      </div>
    </Link>
  );
};
