import { PickType } from '@nestjs/swagger';

import { IsStrongPassword } from 'class-validator';
import { BaseAuthDTO } from './base-auth.dto';

export class RequestSignupDTO extends PickType(BaseAuthDTO, [
  'name',
  'email',
  'password',
]) {
  @IsStrongPassword()
  password!: string;
}
