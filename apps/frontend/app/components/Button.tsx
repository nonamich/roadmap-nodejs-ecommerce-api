import clsx from 'clsx';
import type { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router';

type Props = {
  types?: 'regular' | 'danger';
  tag?: 'a';
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
};

const initialClassName =
  'inline-flex rounded-md px-5 py-2.5 text-sm font-medium text-white transition';

export const Button: FC<PropsWithChildren<Props>> = ({
  types = 'regular',
  to,
  tag,
  children,
  ...props
}) => {
  const className = clsx(initialClassName, {
    ['bg-teal-600 hover:bg-teal-700']: types === 'regular',
    ['bg-rose-600 hover:bg-rose-700']: types === 'danger',
  });

  if (tag === 'a' && to) {
    return (
      <Link to={to} {...props} className={clsx(props.className, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      {...props}
      className={clsx(props.className, className)}
    >
      {children}
    </button>
  );
};
