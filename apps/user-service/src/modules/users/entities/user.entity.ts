import { User } from 'prisma-client';

export class UserEntity implements User {
  name!: string;
  id!: string;
  email!: string;
  password!: string;
}
