import type { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router';

type Props =
  | {
      onClick?: () => void;
    }
  | {
      tag: 'a';
      to: string;
    };

const className =
  'inline-flex rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500';

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  if ('tag' in props) {
    return (
      <Link className={className} to={props.to}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={props.onClick} className={className}>
      {children}
    </button>
  );
};
