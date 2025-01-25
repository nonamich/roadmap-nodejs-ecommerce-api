// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Page<T extends (...args: any) => any> = (props: {
  loaderData: Awaited<ReturnType<T>>;
}) => React.JSX.Element;
