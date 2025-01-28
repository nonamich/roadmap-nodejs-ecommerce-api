import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthorizedUser } from './auth.interface';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/authorized-user.decorator';
import {
  RequestSigninDto,
  RequestSignupDto,
  ResponseAuthorizedUserDto,
  ResponseLoggedInDto,
} from './dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: ResponseLoggedInDto })
  @Post('signup')
  async signup(@Body() dto: RequestSignupDto): Promise<ResponseLoggedInDto> {
    return await this.authService.signup(dto);
  }

  @ApiOkResponse({ type: ResponseLoggedInDto })
  @Post('signin')
  async signin(@Body() dto: RequestSigninDto): Promise<ResponseLoggedInDto> {
    return await this.authService.signin(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @ApiOkResponse({ type: ResponseAuthorizedUserDto })
  @Get('me')
  me(@CurrentUser() user: AuthorizedUser): AuthorizedUser {
    return user;
  }
}
