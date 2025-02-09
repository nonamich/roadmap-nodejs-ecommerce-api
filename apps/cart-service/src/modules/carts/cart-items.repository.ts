import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client/index.js';
import { ORMService } from '~/modules/orm/orm.service';
import { CART_ITEM_SELECT } from './carts.constants';
import { CartItemEntity } from './entities';

@Injectable()
export class CartItemsRepository {
  constructor(private readonly orm: ORMService) {}

  async findUniqueOrThrow(
    where: Prisma.CartItemWhereUniqueInput,
  ): Promise<CartItemEntity> {
    return await this.orm.cartItem.findUniqueOrThrow({
      select: CART_ITEM_SELECT,
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CartItemWhereUniqueInput;
    where?: Prisma.CartItemWhereInput;
    orderBy?: Prisma.CartItemOrderByWithRelationInput;
  }): Promise<CartItemEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.orm.cartItem.findMany({
      select: CART_ITEM_SELECT,
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.CartItemCreateInput): Promise<CartItemEntity> {
    return await this.orm.cartItem.create({
      select: CART_ITEM_SELECT,
      data,
    });
  }

  async update(params: {
    where: Prisma.CartItemWhereUniqueInput;
    data: Prisma.CartItemUpdateInput;
  }): Promise<CartItemEntity> {
    const { where, data } = params;
    return await this.orm.cartItem.update({
      select: CART_ITEM_SELECT,
      data,
      where,
    });
  }

  async delete(
    where: Prisma.CartItemWhereUniqueInput,
  ): Promise<CartItemEntity> {
    return await this.orm.cartItem.delete({
      select: CART_ITEM_SELECT,
      where,
    });
  }

  async deleteMany(where: Prisma.CartItemWhereInput): Promise<void> {
    await this.orm.cartItem.deleteMany({
      where,
    });
  }

  async count(params?: Prisma.CartItemCountArgs): Promise<number> {
    return await this.orm.cartItem.count(params);
  }

  async upsert(args: Prisma.CartItemUpsertArgs): Promise<CartItemEntity> {
    return await this.orm.cartItem.upsert({
      ...args,
      select: CART_ITEM_SELECT,
    });
  }
}
