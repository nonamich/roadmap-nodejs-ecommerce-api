import { ApiProperty } from '@nestjs/swagger';

import { ResponseAuthorizedUserDto } from '.';

export class ResponseLoggedInDto {
  @ApiProperty()
  user!: ResponseAuthorizedUserDto;

  @ApiProperty()
  accessToken!: string;
}
