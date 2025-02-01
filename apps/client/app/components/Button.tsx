import clsx from 'clsx';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { Link } from 'react-router';

type Props =
  | ({
      onClick?: () => void;
    } & ComponentProps<'button'>)
  | ({
      tag: 'a';
      to: string;
    } & ComponentProps<'a'>);

const className =
  'inline-flex rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500';

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  if ('tag' in props) {
    return (
      <Link {...props} className={clsx(props.className, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={clsx(props.className, className)}>
      {children}
    </button>
  );
};
