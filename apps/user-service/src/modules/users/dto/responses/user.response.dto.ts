import { UserResponse } from '@repo/grpc/proto/users';

export class UserResponseDto implements UserResponse {
  id!: string;
  name!: string;
  email!: string;
}
