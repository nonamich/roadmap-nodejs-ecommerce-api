import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthorizedUser } from './auth.interface';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/authorized-user.decorator';
import {
  RequestSigninDTO,
  RequestSignupDTO,
  ResponseAuthorizedUserDTO,
  ResponseLoggedInDTO,
} from './dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: ResponseLoggedInDTO })
  @Post('signup')
  async signup(@Body() dto: RequestSignupDTO): Promise<ResponseLoggedInDTO> {
    return await this.authService.signup(dto);
  }

  @ApiOkResponse({ type: ResponseLoggedInDTO })
  @Post('signin')
  async signin(@Body() dto: RequestSigninDTO): Promise<ResponseLoggedInDTO> {
    return await this.authService.signin(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @ApiOkResponse({ type: ResponseAuthorizedUserDTO })
  @Get('me')
  me(@CurrentUser() user: AuthorizedUser): AuthorizedUser {
    return user;
  }
}
