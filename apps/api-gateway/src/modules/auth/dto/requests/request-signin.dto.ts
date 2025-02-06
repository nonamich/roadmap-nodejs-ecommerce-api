import { PickType } from '@nestjs/swagger';

import { BaseAuthDto } from './base-auth.dto';

export class RequestSigninDto extends PickType(BaseAuthDto, [
  'email',
  'password',
]) {}
