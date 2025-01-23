import { LoginForm } from '~/components';

export function meta() {
  return [{ title: 'Register' }];
}

export default function Register() {
  return (
    <>
      <LoginForm isRegister />
    </>
  );
}
