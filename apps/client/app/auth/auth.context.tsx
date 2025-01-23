import { createContext } from 'react';

import { type AuthContextInterface } from './auth.types';

export const AuthContext = createContext<AuthContextInterface>(
  {} as AuthContextInterface,
);
