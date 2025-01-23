import { AuthorizedUser } from '../auth.interface';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends AuthorizedUser {}
  }
}
