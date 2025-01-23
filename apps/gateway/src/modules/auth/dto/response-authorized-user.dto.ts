import { PickType } from '@nestjs/swagger';

import { BaseAuthDTO } from '.';

export class ResponseAuthorizedUserDTO extends PickType(BaseAuthDTO, [
  'id',
  'name',
  'email',
]) {}
