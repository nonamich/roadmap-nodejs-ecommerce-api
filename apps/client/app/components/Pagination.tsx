import clsx from 'clsx';
import RCPagination from 'rc-pagination';
import type { FC } from 'react';
import { Case, Default, Switch } from 'react-if';

export type Props = {
  page: number;
  take: number;
  totalCount: number;
};

export const Pagination: FC<Props> = ({ page, take, totalCount }) => {
  if (totalCount <= take) {
    return <></>;
  }

  return (
    <RCPagination
      className="mt-8 flex justify-center gap-1 text-xs font-medium"
      // onChange={setPage}
      itemRender={(current, type) => {
        const isJump = type === 'jump-next' || type === 'jump-prev';

        return (
          <span
            className={clsx(
              'inline-flex size-8 cursor-pointer items-center justify-center rounded border border-gray-600 hover:bg-slate-600',
              {
                ['pointer-events-none']: isJump,
                ['border-slate-800 bg-slate-800']: page === current,
              },
            )}
          >
            <Switch>
              <Case condition={isJump}>...</Case>
              <Case condition={type === 'prev'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Case>
              <Case condition={type === 'next'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </Case>
              <Default>{current}</Default>
            </Switch>
          </span>
        );
      }}
      current={page}
      pageSize={take}
      total={totalCount}
    />
  );
};
