import type { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '~/auth/hooks';

export const AuthRequired: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.loading) {
    return <></>;
  }

  if (!auth.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
