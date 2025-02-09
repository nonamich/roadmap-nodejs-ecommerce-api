import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma-client/index.js';
import { ORMService } from '~/modules/orm/orm.service';
import { CATEGORY_SELECT } from './categories.constants';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly orm: ORMService) {}

  async findUniqueOrThrow(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<CategoryEntity> {
    return await this.orm.category.findUniqueOrThrow({
      select: CATEGORY_SELECT,
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoryWhereUniqueInput;
    where?: Prisma.CategoryWhereInput;
    orderBy?: Prisma.CategoryOrderByWithRelationInput;
  }): Promise<CategoryEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.orm.category.findMany({
      select: CATEGORY_SELECT,
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.CategoryCreateInput): Promise<CategoryEntity> {
    return await this.orm.category.create({
      select: CATEGORY_SELECT,
      data,
    });
  }

  async update(params: {
    where: Prisma.CategoryWhereUniqueInput;
    data: Prisma.CategoryUpdateInput;
  }): Promise<CategoryEntity> {
    const { where, data } = params;
    return await this.orm.category.update({
      select: CATEGORY_SELECT,
      data,
      where,
    });
  }

  async delete(
    where: Prisma.CategoryWhereUniqueInput,
  ): Promise<CategoryEntity> {
    return await this.orm.category.delete({
      select: CATEGORY_SELECT,
      where,
    });
  }

  async count(params?: Prisma.CategoryCountArgs): Promise<number> {
    return await this.orm.category.count(params);
  }
}
