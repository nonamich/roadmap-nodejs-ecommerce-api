/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useState, type FC, type SyntheticEvent } from 'react';
import { Else, If, Then } from 'react-if';
import { Link, useLocation, useNavigate } from 'react-router';
import type { RequestSignupDto } from '~/api';
import { useAuth } from '~/auth/hooks';
import { Button } from './Button';

type Props = {
  isRegister?: boolean;
};

export const LoginForm: FC<Props> = ({ isRegister = false }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { loading, signin, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const dto = {
      email: data.get('email')?.toString()!,
      password: data.get('password')?.toString()!,
    };

    const dtoSignup: RequestSignupDto = {
      ...dto,
      name: data.get('name')?.toString()!,
    };

    const promise = isRegister ? signup(dtoSignup) : signin(dto);

    await promise
      .then(() => {
        navigate(from, {
          replace: true,
          viewTransition: true,
        });
      })
      .catch((err) => {
        if (err.message) {
          if (!Array.isArray(err.message)) {
            err.message = [err.message];
          }

          setErrors(err.message);
        }
      });
  };

  return (
    <div className="mx-auto max-w-lg pt-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
      </div>
      {errors.map((error, index) => {
        return (
          <p key={index} className="mt-3 text-center text-sm text-red-500">
            {error}
          </p>
        );
      })}
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <If condition={isRegister}>
          <Then>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>

              <div className="relative">
                <input
                  name="name"
                  type="text"
                  className="w-full rounded-lg border-gray-800 bg-slate-900 p-4 pe-12 text-sm shadow-sm"
                  required
                  placeholder="Enter name"
                />
              </div>
            </div>
          </Then>
        </If>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <div className="relative">
            <input
              name="email"
              type="email"
              className="w-full rounded-lg border-gray-800 bg-slate-900 p-4 pe-12 text-sm shadow-sm"
              required
              placeholder="Enter email"
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={isShowPassword ? 'text' : 'password'}
              className="w-full rounded-lg border-gray-800 bg-slate-900 p-4 pe-12 text-sm shadow-sm"
              required
              placeholder="Enter password"
            />
            <span
              className="absolute inset-y-0 end-0 grid cursor-pointer place-content-center px-4"
              onClick={() => setIsShowPassword((value) => !value)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <If condition={isRegister}>
              <Then>
                Already have account?{' '}
                <Link className="underline" to="/signin" viewTransition>
                  Sign in
                </Link>
              </Then>
              <Else>
                No account?{' '}
                <Link className="underline" to="/signup" viewTransition>
                  Sign up
                </Link>
              </Else>
            </If>
          </p>
          <Button
            type="submit"
            disabled={loading}
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            <If condition={loading}>
              <Then>Loading...</Then>
              <Else>
                <If condition={isRegister}>
                  <Then>Sign up</Then>
                  <Else>Sign in</Else>
                </If>
              </Else>
            </If>
          </Button>
        </div>
      </form>
    </div>
  );
};
