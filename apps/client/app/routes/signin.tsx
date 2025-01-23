import { LoginForm } from '~/components';

export function meta() {
  return [{ title: 'Signin' }];
}

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}
