import { Injectable } from '@nestjs/common';
import { Prisma } from '@packages/shared/db/user';
import { ORMService } from '~/modules/orm/orm.service';
import { UserEntity } from './entities';
import { USER_SELECT } from './users.constants';

@Injectable()
export class UsersRepository {
  constructor(private readonly orm: ORMService) {}

  async findUniqueOrThrow(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<UserEntity> {
    return await this.orm.user.findUniqueOrThrow({
      select: USER_SELECT,
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.orm.user.findMany({
      select: USER_SELECT,
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<UserEntity> {
    return await this.orm.user.create({
      select: USER_SELECT,
      data,
    });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<UserEntity> {
    const { where, data } = params;
    return await this.orm.user.update({
      select: USER_SELECT,
      data,
      where,
    });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<UserEntity> {
    return await this.orm.user.delete({
      select: USER_SELECT,
      where,
    });
  }

  async count(params?: Prisma.UserCountArgs): Promise<number> {
    return await this.orm.user.count(params);
  }
}
