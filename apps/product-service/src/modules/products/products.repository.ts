import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client/product/index.js';
import { ORMService } from '~/modules/orm/orm.service';
import { ProductEntity } from './entities/product.entity';
import { PRODUCT_SELECT } from './products.constants';

@Injectable()
export class ProductsRepository {
  constructor(private readonly orm: ORMService) {}

  async findUniqueOrThrow(
    where: Prisma.ProductWhereUniqueInput,
  ): Promise<ProductEntity> {
    return await this.orm.product.findUniqueOrThrow({
      select: PRODUCT_SELECT,
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<ProductEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.orm.product.findMany({
      select: PRODUCT_SELECT,
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.ProductCreateInput): Promise<ProductEntity> {
    return await this.orm.product.create({
      select: PRODUCT_SELECT,
      data,
    });
  }

  async update(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<ProductEntity> {
    const { where, data } = params;
    return await this.orm.product.update({
      select: PRODUCT_SELECT,
      data,
      where,
    });
  }

  async delete(where: Prisma.ProductWhereUniqueInput): Promise<ProductEntity> {
    return await this.orm.product.delete({
      select: PRODUCT_SELECT,
      where,
    });
  }

  async count(params?: Prisma.ProductCountArgs): Promise<number> {
    return await this.orm.product.count(params);
  }
}
