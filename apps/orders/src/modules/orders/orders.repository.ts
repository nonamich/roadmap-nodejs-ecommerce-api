import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma-client';
import { ORMService } from '~/modules/orm/orm.service';
import { OrderEntity } from './entities';
import { ORDER_SELECT } from './orders.constants';

@Injectable()
export class OrdersRepository {
  constructor(private readonly orm: ORMService) {}

  async findUniqueOrThrow(
    where: Prisma.OrderWhereUniqueInput,
  ): Promise<OrderEntity> {
    return await this.orm.order.findUniqueOrThrow({
      select: ORDER_SELECT,
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrderWhereUniqueInput;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput;
  }): Promise<OrderEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.orm.order.findMany({
      select: ORDER_SELECT,
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.OrderCreateInput): Promise<OrderEntity> {
    return await this.orm.order.create({
      select: ORDER_SELECT,
      data,
    });
  }

  async update(params: {
    where: Prisma.OrderWhereUniqueInput;
    data: Prisma.OrderUpdateInput;
  }): Promise<OrderEntity> {
    const { where, data } = params;
    return await this.orm.order.update({
      select: ORDER_SELECT,
      data,
      where,
    });
  }

  async delete(where: Prisma.OrderWhereUniqueInput): Promise<OrderEntity> {
    return await this.orm.order.delete({
      select: ORDER_SELECT,
      where,
    });
  }

  async count(params?: Prisma.OrderCountArgs): Promise<number> {
    return await this.orm.order.count(params);
  }
}
