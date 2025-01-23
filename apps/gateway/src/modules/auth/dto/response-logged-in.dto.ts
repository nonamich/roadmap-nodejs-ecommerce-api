import { ApiProperty } from '@nestjs/swagger';

import { ResponseAuthorizedUserDTO } from '.';

export class ResponseLoggedInDTO {
  @ApiProperty()
  user!: ResponseAuthorizedUserDTO;

  @ApiProperty()
  accessToken!: string;
}
