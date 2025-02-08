import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma-client';
import { ORMService } from '~/modules/orm/orm.service';
import { OrderEntity } from './entities';
import { ORDER_SELECT } from './orders.constants';

@Injectable()
export class OrdersRepository {
  constructor(private readonly orm: ORMService) {}

  async findUniqueOrThrow(
    where: Prisma.OrderFindUniqueOrThrowArgs['where'],
  ): Promise<OrderEntity> {
    return await this.orm.order.findUniqueOrThrow({
      select: ORDER_SELECT,
      where,
    });
  }

  async findMany(
    params: Omit<Prisma.OrderFindManyArgs, 'select'>,
  ): Promise<OrderEntity[]> {
    return await this.orm.order.findMany({
      select: ORDER_SELECT,
      ...params,
    });
  }

  async create(data: Prisma.OrderCreateInput): Promise<OrderEntity> {
    return await this.orm.order.create({
      select: ORDER_SELECT,
      data,
    });
  }

  async update(params: Prisma.OrderUpdateArgs): Promise<OrderEntity> {
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
