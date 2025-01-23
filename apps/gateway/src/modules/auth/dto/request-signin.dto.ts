import { PickType } from '@nestjs/swagger';

import { BaseAuthDTO } from './base-auth.dto';

export class RequestSigninDTO extends PickType(BaseAuthDTO, [
  'email',
  'password',
]) {}
