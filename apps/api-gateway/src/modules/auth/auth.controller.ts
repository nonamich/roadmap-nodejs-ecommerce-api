import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthorizedUser } from './auth.interface';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/authorized-user.decorator';
import { RequestSigninDto, RequestSignupDto } from './dto/requests';
import { AuthorizedUserEntity, LoggedInEntity } from './dto/responses';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: LoggedInEntity })
  @Post('signup')
  async signup(@Body() dto: RequestSignupDto): Promise<LoggedInEntity> {
    return await this.authService.signup(dto);
  }

  @ApiOkResponse({ type: LoggedInEntity })
  @Post('signin')
  async signin(@Body() dto: RequestSigninDto): Promise<LoggedInEntity> {
    return await this.authService.signin(dto);
  }

  @Auth()
  @ApiOkResponse({ type: AuthorizedUserEntity })
  @Get('me')
  me(@CurrentUser() user: AuthorizedUser): AuthorizedUserEntity {
    return user;
  }
}
