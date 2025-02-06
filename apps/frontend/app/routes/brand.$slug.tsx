import {
  data as createError,
  useLoaderData,
  type ClientLoaderFunctionArgs,
} from 'react-router';
import { productsControllerGetProductsByFilter } from '~/api';
import { Breadcrumbs, ProductCollection } from '~/components';

const LIMIT = 8;

export async function clientLoader({
  request,
  params,
}: ClientLoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = +(url.searchParams.get('page') || 1);

  if (!params.id) {
    throw createError('Not Found', 404);
  }

  const {
    data: { brand, ...data },
  } = await productsControllerGetProductsByFilter({
    throwOnError: true,
    query: {
      pagination: {
        page,
        limit: LIMIT,
      },
      brandId: +params.id,
    },
  });

  if (!brand) {
    throw createError('Not Found', 404);
  }

  return { ...data, brand };
}

export default function Brand() {
  const { brand, ...data } = useLoaderData<typeof clientLoader>();

  return (
    <>
      <Breadcrumbs
        links={[
          {
            text: brand.name,
          },
        ]}
      />
      <h1 className="text-xl">Brand: {brand.name}</h1>
      <ProductCollection {...data} />
    </>
  );
}
