import {
  data as createError,
  useLoaderData,
  type ClientLoaderFunctionArgs,
} from 'react-router';
import { productsControllerGetProductsByFilter } from '~/api';
import { Breadcrumbs, ProductCollection } from '~/components';

export async function clientLoader({
  request,
  params,
}: ClientLoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = +(url.searchParams.get('page') || 1);

  if (!params.slug) {
    throw createError('Not Found', 404);
  }

  const {
    data: { category, ...data },
  } = await productsControllerGetProductsByFilter({
    throwOnError: true,
    query: {
      pagination: {
        page,
        limit: 8,
      },
      categorySlug: params.slug,
    },
  });

  if (!category) {
    throw createError('Not Found', 404);
  }

  return { ...data, category };
}

export default function Brand() {
  const { category, ...data } = useLoaderData<typeof clientLoader>();

  return (
    <>
      <Breadcrumbs
        links={[
          {
            text: category.name,
          },
        ]}
      />
      <h1 className="text-xl">Category: {category.name}</h1>
      <ProductCollection {...data} />
    </>
  );
}
