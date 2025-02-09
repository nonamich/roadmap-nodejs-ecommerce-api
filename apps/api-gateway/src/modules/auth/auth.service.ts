import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { USER_SERVICE_NAME, UserServiceClient } from '@packages/grpc/pb/user';
import { firstValueFrom } from 'rxjs';
import { AuthorizedUser } from './auth.interface';
import { RequestSigninDto, RequestSignupDto } from './dto/requests';
import { LoggedInResponseDto } from './dto/responses';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE_NAME)
    private userService: UserServiceClient,
    private jwtService: JwtService,
  ) {}

  async signup(data: RequestSignupDto): Promise<LoggedInResponseDto> {
    const { email } = await firstValueFrom(this.userService.createUser(data));

    return await this.signin({ email, password: data.password });
  }

  async signin(data: RequestSigninDto): Promise<LoggedInResponseDto> {
    const user = await firstValueFrom(
      this.userService.getUserByCredentials(data),
    );

    return {
      accessToken: this.getAccessToken(user),
      user,
    };
  }

  getAccessToken(payload: AuthorizedUser): string {
    return this.jwtService.sign(payload);
  }
}
