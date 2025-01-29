import clsx from 'clsx';
import { useEffect, useState, type FC } from 'react';
import { Link } from 'react-router';
import type { CartItemResponseDto } from '~/api';
import { useCart } from '~/cart/hooks';

export const CartItem: FC<CartItemResponseDto> = ({
  product,
  quantity: initialQuantity,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const cart = useCart();

  useEffect(() => {
    cart;
  }, [cart]);

  return (
    <li
      className={clsx('flex items-center gap-4', {
        'pointer-events-none opacity-20': cart.loading,
      })}
    >
      <img src={product.image} className="size-16 rounded object-cover" />
      <div>
        <h3 className="text-sm text-gray-100">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">
        <form>
          <label htmlFor="Line1Qty" className="sr-only">
            {' '}
            Quantity{' '}
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={({ target }) => setQuantity(+target.value)}
            className="h-10 w-12 rounded border-gray-700 bg-gray-800 px-1 text-center text-xs text-gray-100"
          />
        </form>
        <button className="text-gray-600 transition hover:text-red-600">
          <span className="sr-only">Remove item</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};
