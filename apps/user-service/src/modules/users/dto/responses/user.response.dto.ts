import { UserResponse } from '@repo/grpc/pb/user';

export class UserResponseDto implements UserResponse {
  id!: string;
  name!: string;
  email!: string;
}
