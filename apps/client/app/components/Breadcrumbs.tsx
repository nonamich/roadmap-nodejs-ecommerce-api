import clsx from 'clsx';
import type { FC } from 'react';
import { Link } from 'react-router';

type Props = {
  links: Array<{
    href?: string;
    text: string;
  }>;
};

export const Breadcrumbs: FC<Props> = ({ links }) => {
  const linksCopy = [...links];

  linksCopy.unshift({
    href: '/',
    text: 'Home',
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center text-sm dark:text-gray-300">
        {linksCopy.map(({ href, text }, index) => {
          const classes = clsx('block text-xs font-medium transition', {
            ['dark:hover:text-gray-500']: href,
            ['dark:text-gray-500']: !href,
          });

          return (
            <li key={index} className="flex items-center">
              {Boolean(index) && <span className="mx-3">/</span>}
              {href && (
                <Link to={href} className={classes}>
                  {text}
                </Link>
              )}
              {!href && <span className={classes}>{text}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
