import { PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../dto';

export class AuthorizedUserEntity extends PickType(BaseAuthDto, [
  'id',
  'name',
  'email',
]) {}
