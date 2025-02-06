import { UserResponse } from '@repo/grpc/proto/users';

export class UserResponseDto implements UserResponse {
  id!: number;
  name!: string;
  email!: string;
}
