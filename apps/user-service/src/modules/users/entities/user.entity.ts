import { User } from '@packages/shared/db/user';

export class UserEntity implements User {
  name!: string;
  id!: string;
  email!: string;
  password!: string;
}
