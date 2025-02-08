import { useState } from 'react';
import {
  data as createError,
  useLoaderData,
  type ClientLoaderFunctionArgs,
} from 'react-router';
import { productsControllerGetProductBySlug } from '~/api';
import { useCart } from '~/cart/hooks';
import { Breadcrumbs, Price, QuantityInput } from '~/components';

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  if (!params.slug) {
    throw createError('Not Found', 404);
  }

  const { data } = await productsControllerGetProductBySlug({
    throwOnError: true,
    path: {
      slug: params.slug,
    },
  });

  return data;
}

const Product = () => {
  const cart = useCart();
  const product = useLoaderData<typeof clientLoader>();
  const [quantity, setQuantity] = useState(1);
  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    cart.add(product.id, quantity);
  };

  return (
    <>
      <Breadcrumbs
        links={[
          {
            href: `/category/${product.category.slug}`,
            text: product.category.name,
          },
          {
            href: `/brand/${product.brand.slug}`,
            text: product.brand.name,
          },
          {
            text: product.title,
          },
        ]}
      />
      <section className="py-8">
        <div>
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="mx-auto max-w-md shrink-0 lg:max-w-lg">
              <img src={product.image} />
            </div>
            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {product.title}
              </h1>
              <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                  <Price {...product} />
                </p>

                <div className="mt-2 flex items-center gap-2 sm:mt-0">
                  Rating:
                  {product.rating && (
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                      {(product.rating * 10).toFixed(2)} / 10
                    </p>
                  )}
                </div>

                <div className="mt-2 flex items-center gap-2 sm:mt-0">
                  Amount:
                  <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                    {product.amount}
                  </p>
                </div>
              </div>
              <form
                className="mt-6 flex items-center gap-2"
                onSubmit={onSubmit}
              >
                <QuantityInput
                  max={product.amount}
                  onChange={setQuantity}
                  quantity={quantity}
                />
                <button
                  className="focus:ring-primary-300 dark:focus:ring-primary-800 mt-4 flex items-center justify-center rounded bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 sm:mt-0 dark:bg-teal-600 dark:hover:bg-teal-700"
                  role="button"
                  disabled={cart.loading}
                >
                  <svg
                    className="-ms-2 me-2 h-5 w-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                    />
                  </svg>
                  Add to cart
                </button>
              </form>
              <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-800" />
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
