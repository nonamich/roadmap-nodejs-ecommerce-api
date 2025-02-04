import { User } from '@repo/grpc/proto/users';

export class UserEntity implements User {
  id!: number;
  name!: string;
  email!: string;
}
