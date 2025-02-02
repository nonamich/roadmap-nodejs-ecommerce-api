import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { USERS_SERVICE_NAME, UsersServiceClient } from '@repo/grpc/proto/users';
import { firstValueFrom } from 'rxjs';
import { AuthorizedUser } from './auth.interface';
import { RequestSigninDto, RequestSignupDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE_NAME)
    private usersService: UsersServiceClient,
    private jwtService: JwtService,
  ) {}

  async signup(data: RequestSignupDto) {
    const { email } = await firstValueFrom(this.usersService.createUser(data));

    return await this.signin({ email, password: data.password });
  }

  async signin(data: RequestSigninDto) {
    const user = await firstValueFrom(
      this.usersService.getUserByCredentials(data),
    );

    return {
      accessToken: this.getAccessToken(user),
      user,
    };
  }

  getAccessToken(user: AuthorizedUser) {
    return this.jwtService.sign(user);
  }
}
