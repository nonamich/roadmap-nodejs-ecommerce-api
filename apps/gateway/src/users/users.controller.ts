import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { USERS_SERVICE_NAME, UsersServiceClient } from '@packages/grpc';
import { toArray } from 'rxjs';
import { GetUsersDto } from './dto/GetUsers.dto';
import { USERS_PROVIDER_TOKEN } from './users.constants';

@Controller('users')
export class UsersController {
  readonly USERS_PER_PAGE = 20;
  private userRpc!: UsersServiceClient;

  constructor(@Inject(USERS_PROVIDER_TOKEN) private client: ClientGrpc) {
    this.userRpc =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  @Get('/')
  getHello(@Query() { page }: GetUsersDto) {
    return this.userRpc
      .getUsers({ page, pageSize: this.USERS_PER_PAGE })
      .pipe(toArray());
  }
}
