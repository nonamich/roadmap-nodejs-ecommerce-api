import { PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '.';

export class ResponseAuthorizedUserDto extends PickType(BaseAuthDto, [
  'id',
  'name',
  'email',
]) {}
