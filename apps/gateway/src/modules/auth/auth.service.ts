import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { firstValueFrom } from 'rxjs';
import { UsersService } from '../users/users.service';
import { AuthorizedUser } from './auth.interface';
import { RequestSigninDTO, RequestSignupDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
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
