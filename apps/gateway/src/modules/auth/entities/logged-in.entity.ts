import { ApiProperty } from '@nestjs/swagger';

import { AuthorizedUserEntity } from './authorized-user.entity';

export class LoggedInEntity {
  @ApiProperty()
  user!: AuthorizedUserEntity;

  @ApiProperty()
  accessToken!: string;
}
