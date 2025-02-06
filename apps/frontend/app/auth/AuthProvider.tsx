import { useMutation } from '@tanstack/react-query';
import {
  type FC,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import {
  authControllerMe,
  client,
  type ResponseAuthorizedUserDto,
  type ResponseLoggedInDto,
} from '~/api';
import {
  authControllerSigninMutation,
  authControllerSignupMutation,
} from '~/api/@tanstack/react-query.gen';
import { AUTH_LOCAL_STORAGE_NAME } from './auth.constants';
import { AuthContext } from './auth.context';
import type { AuthContextValue, AuthStatus } from './auth.types';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigation = useNavigate();
  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<ResponseAuthorizedUserDto>();
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(() => {
    if (import.meta.env.SSR) {
      return null;
    }

    return localStorage.getItem(AUTH_LOCAL_STORAGE_NAME);
  });

  const signinMutation = useMutation(authControllerSigninMutation());
  const signupMutation = useMutation(authControllerSignupMutation());

  const setStates = ({ accessToken, user }: Partial<ResponseLoggedInDto>) => {
    if (accessToken) {
      setAccessToken(accessToken);
    }

    if (user) {
      setUser(user);
    }
  };

  const onFinally = useCallback(() => {
    setLoading(false);

    setStatus(() => {
      if (user) {
        return 'authenticated';
      } else {
        return 'unauthenticated';
      }
    });
  }, [user]);

  const value: AuthContextValue = {
    status,
    user,
    loading,
    accessToken,
    signin(body) {
      setLoading(true);

      return signinMutation
        .mutateAsync({ body })
        .then(setStates)
        .finally(onFinally);
    },
    signup(body) {
      setLoading(true);

      return signupMutation
        .mutateAsync({ body })
        .then(setStates)
        .finally(onFinally);
    },
    logout() {
      setAccessToken('');
      setUser(undefined);
      navigation('/');
    },
  };
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(AUTH_LOCAL_STORAGE_NAME, accessToken);
    } else {
      localStorage.removeItem(AUTH_LOCAL_STORAGE_NAME);
    }
  }, [accessToken]);

  useEffect(() => {
    setStatus(user ? 'authenticated' : 'unauthenticated');
  }, [user, loading]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    client.interceptors.request.use((config) => {
      config.headers.set('Authorization', `Bearer ${accessToken}`);

      return config;
    });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken || user) {
      setStatus('unauthenticated');

      return;
    }

    setLoading(true);

    authControllerMe({ throwOnError: true })
      .then(({ data: user }) => {
        setUser(user);
      })
      .catch(() => {
        setAccessToken('');
      })
      .finally(onFinally);
  }, [accessToken, onFinally, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
