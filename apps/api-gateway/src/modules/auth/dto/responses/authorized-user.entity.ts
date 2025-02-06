import { PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../requests';

export class AuthorizedUserEntity extends PickType(BaseAuthDto, [
  'id',
  'name',
  'email',
]) {}
