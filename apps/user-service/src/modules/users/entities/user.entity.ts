import { User } from '@prisma-client/index.js';

export class UserEntity implements User {
  name!: string;
  id!: string;
  email!: string;
  password!: string;
}
