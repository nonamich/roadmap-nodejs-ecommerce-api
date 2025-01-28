import { AuthRequired, Breadcrumbs, Cart } from '~/components';

export default function CartPage() {
  return (
    <AuthRequired>
      <Breadcrumbs
        links={[
          {
            text: 'Cart',
          },
        ]}
      />
      <Cart />
    </AuthRequired>
  );
}
