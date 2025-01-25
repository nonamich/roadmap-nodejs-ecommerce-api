import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersServiceClient } from '@packages/grpc/proto/users';
import { firstValueFrom } from 'rxjs';
import { USERS_SERVICE_PROVIDER_TOKEN } from '../users/users.constants';
import { AuthorizedUser } from './auth.interface';
import { RequestSigninDTO, RequestSignupDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE_PROVIDER_TOKEN)
    private usersService: UsersServiceClient,
    private jwtService: JwtService,
  ) {}

  async signup(data: RequestSignupDTO) {
    const { email } = await firstValueFrom(this.usersService.createUser(data));

    return await this.signin({ email, password: data.password });
  }

  async signin(data: RequestSigninDTO) {
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
