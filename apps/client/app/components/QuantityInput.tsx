import type { FC } from 'react';

type Props = {
  max: number;
  quantity: number;
  onChange(quantity: number): void;
};

export const QuantityInput: FC<Props> = ({ onChange, quantity, max }) => {
  return (
    <div>
      <div className="flex items-center rounded border border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={() => onChange(Math.max(quantity - 1, 1))}
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 dark:text-gray-300"
        >
          -
        </button>
        <input
          type="number"
          readOnly
          value={quantity}
          min={1}
          max={max}
          className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm dark:bg-gray-900 dark:text-white [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => onChange(Math.min(quantity + 1, max))}
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 dark:text-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
};
