import { AuthorizedUser } from '../auth.interface';

declare global {
  namespace Express {
    interface User extends AuthorizedUser {}
  }
}
