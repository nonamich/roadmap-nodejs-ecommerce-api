import { ApiProperty } from '@nestjs/swagger';

import { AuthorizedUserResponseDto } from './authorized-user.response.dto';

export class LoggedInResponseDto {
  @ApiProperty()
  user!: AuthorizedUserResponseDto;

  @ApiProperty()
  accessToken!: string;
}
