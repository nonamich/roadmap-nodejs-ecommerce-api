import { useLoaderData, type ClientLoaderFunctionArgs } from 'react-router';
import { productsControllerGetFeaturedProducts } from '~/api';
import { ProductCollection } from '~/components';

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const query = new URL(request.url).searchParams;
  const page = Number(query.get('page') || 1);
  const { data } = await productsControllerGetFeaturedProducts({
    throwOnError: true,
    query: {
      pagination: {
        page,
        limit: 8,
      },
    },
  });

  return data;
}

export default function Home() {
  const data = useLoaderData<typeof clientLoader>();

  return (
    <>
      <h1 className="text-xl">Featured Products</h1>
      <ProductCollection {...data} />
    </>
  );
}
