import {
  data as createError,
  useLoaderData,
  type ClientLoaderFunctionArgs,
} from 'react-router';
import { productsControllerGetProductsByFilter } from '~/api';
import { ProductCollection } from '~/components';

const TAKE = 8;

export async function clientLoader({
  request,
  params,
}: ClientLoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = +(url.searchParams.get('page') || 1);

  if (!params.brandId) {
    throw createError('Not Found', 404);
  }

  const { data } = await productsControllerGetProductsByFilter({
    query: {
      page,
      take: TAKE,
      brandId: +params.brandId,
    },
  });

  if (!data) {
    throw createError('Not Found', 404);
  }

  return {
    page,
    ...data,
  };
}

export default function Brand() {
  const { products, totalCount, page } = useLoaderData<typeof clientLoader>();

  return (
    <>
      <ProductCollection
        totalCount={totalCount}
        page={page}
        take={TAKE}
        products={products}
      />
    </>
  );
}
