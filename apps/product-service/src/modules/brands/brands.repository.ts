import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma-client';
import { ORMService } from '~/modules/orm/orm.service';
import { BRAND_SELECT } from './brands.constants';
import { BrandEntity } from './entities/brand.entity';

@Injectable()
export class BrandsRepository {
  constructor(private readonly orm: ORMService) {}

  async findUniqueOrThrow(
    where: Prisma.BrandWhereUniqueInput,
  ): Promise<BrandEntity> {
    return await this.orm.brand.findUniqueOrThrow({
      select: BRAND_SELECT,
      where,
    });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BrandWhereUniqueInput;
    where?: Prisma.BrandWhereInput;
    orderBy?: Prisma.BrandOrderByWithRelationInput;
  }): Promise<BrandEntity[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return await this.orm.brand.findMany({
      select: BRAND_SELECT,
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.BrandCreateInput): Promise<BrandEntity> {
    return await this.orm.brand.create({
      select: BRAND_SELECT,
      data,
    });
  }

  async update(params: {
    where: Prisma.BrandWhereUniqueInput;
    data: Prisma.BrandUpdateInput;
  }): Promise<BrandEntity> {
    const { where, data } = params;
    return await this.orm.brand.update({
      select: BRAND_SELECT,
      data,
      where,
    });
  }

  async delete(where: Prisma.BrandWhereUniqueInput): Promise<BrandEntity> {
    return await this.orm.brand.delete({
      select: BRAND_SELECT,
      where,
    });
  }

  async count(params?: Prisma.BrandCountArgs): Promise<number> {
    return await this.orm.brand.count(params);
  }
}
