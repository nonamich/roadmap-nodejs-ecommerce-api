import { UserResponse } from '@repo/grpc/proto/users';
import { Exclude } from 'class-transformer';

export class UserResponseDto implements UserResponse {
  id!: number;
  name!: string;
  email!: string;

  @Exclude()
  private password!: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
