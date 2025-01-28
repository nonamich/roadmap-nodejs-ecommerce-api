import type {
  RequestSigninDto,
  RequestSignupDto,
  ResponseAuthorizedUserDto,
} from '~/api';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthContextValue {
  status: AuthStatus;
  accessToken: string | null;
  user?: ResponseAuthorizedUserDto;
  loading: boolean;
  logout: () => void;
  signin: (body: RequestSigninDto) => Promise<void>;
  signup: (body: RequestSignupDto) => Promise<void>;
}
