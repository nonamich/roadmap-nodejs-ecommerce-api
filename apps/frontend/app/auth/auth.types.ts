import type {
  AuthorizedUserResponseDto,
  RequestSigninDto,
  RequestSignupDto,
} from '~/api';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthContextValue {
  status: AuthStatus;
  accessToken: string | null;
  user?: AuthorizedUserResponseDto;
  loading: boolean;
  logout: () => void;
  signin: (body: RequestSigninDto) => Promise<void>;
  signup: (body: RequestSignupDto) => Promise<void>;
}
