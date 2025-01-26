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
  authControllerSignin,
  authControllerSignup,
  client,
  type ResponseAuthorizedUserDto,
  type ResponseLoggedInDto,
} from '~/api';
import { AUTH_LOCAL_STORAGE_NAME } from './auth.constants';
import { AuthContext } from './auth.context';
import type { AuthContextInterface, AuthStatus } from './auth.types';

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

  const value: AuthContextInterface = {
    status,
    user,
    loading,
    accessToken,
    signin(body) {
      setLoading(true);

      return authControllerSignin({ body, throwOnError: true })
        .then(({ data }) => {
          setStates(data);
        })
        .finally(onFinally);
    },
    signup(body) {
      setLoading(true);

      return authControllerSignup({ body, throwOnError: true })
        .then(({ data }) => {
          setStates(data);
        })
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
    if (!user) {
      setStatus('unauthenticated');
    } else {
      setStatus('authenticated');
    }
  }, [user, loading]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    client.setConfig({
      auth: accessToken,
    });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken || user) {
      setStatus('unauthenticated');

      return;
    }

    setLoading(true);

    authControllerMe()
      .then(({ data: user }) => {
        if (!user) {
          return;
        }

        setUser(user);
      })
      .finally(onFinally);
  }, [accessToken, onFinally, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
