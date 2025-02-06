import { PickType } from '@nestjs/swagger';

import { BaseAuthDto } from '../requests';

export class AuthorizedUserResponseDto extends PickType(BaseAuthDto, [
  'id',
  'name',
  'email',
]) {}
