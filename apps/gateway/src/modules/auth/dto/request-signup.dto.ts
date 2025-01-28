import { PickType } from '@nestjs/swagger';

import { IsStrongPassword } from 'class-validator';
import { BaseAuthDto } from './base-auth.dto';

export class RequestSignupDto extends PickType(BaseAuthDto, [
  'name',
  'email',
  'password',
]) {
  @IsStrongPassword()
  password!: string;
}
