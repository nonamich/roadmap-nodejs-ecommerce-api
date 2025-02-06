import { AuthRequired, Breadcrumbs, Orders } from '~/components';

export default function OrdersPage() {
  return (
    <AuthRequired>
      <Breadcrumbs
        links={[
          {
            text: 'Orders',
          },
        ]}
      />
      <Orders />
    </AuthRequired>
  );
}
