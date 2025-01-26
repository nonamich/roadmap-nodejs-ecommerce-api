import { Controller, UseFilters } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { GrpcValidationPipe } from '@packages/grpc';
import {
  ProductsServiceController,
  ProductsServiceControllerMethods,
} from '@packages/grpc/proto/products';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import { ORMService } from '~/modules/orm/orm.service';
import {
  GetFeaturedProductsRequestDto,
  GetProductByIdRequestDto,
  GetProductsByFilterRequestDto,
} from './dto';
import { PRODUCTS_SELECT } from './products.constants';

@Controller()
@ProductsServiceControllerMethods()
export class ProductsController implements ProductsServiceController {
  constructor(private readonly orm: ORMService) {}

  @UseFilters(PrismaClientExceptionFilter)
  async getProductById(
    @Payload(GrpcValidationPipe) { id }: GetProductByIdRequestDto,
  ) {
    const product = await this.orm.product.findUniqueOrThrow({
      where: { id },
      select: PRODUCTS_SELECT,
    });

    return product;
  }

  @UseFilters(PrismaClientExceptionFilter)
  async getFeaturedProducts(
    @Payload(GrpcValidationPipe)
    { pagination }: GetFeaturedProductsRequestDto,
  ) {
    const [products, totalCount] = await Promise.all([
      this.orm.product.findMany({
        select: PRODUCTS_SELECT,
        where: {
          featuredProduct: {
            is: {},
          },
        },
        take: pagination.limit,
        skip: Math.floor(pagination.limit * pagination.page - pagination.limit),
      }),
      this.orm.featuredProduct.count(),
    ]);

    if (!products.length || !totalCount) {
      throw new GrpcNotFoundException('Not Found');
    }

    return {
      products,
      pagination: {
        ...pagination,
        totalCount,
      },
    };
  }

  @UseFilters(PrismaClientExceptionFilter)
  async getProductsByFilter(
    @Payload(GrpcValidationPipe)
    { pagination, brandId, categoryId }: GetProductsByFilterRequestDto,
  ) {
    const where = {
      brandId,
      categoryId,
    };
    const [products, totalCount, brand, category] = await Promise.all([
      this.orm.product.findMany({
        select: PRODUCTS_SELECT,
        where: where,
        take: pagination.limit,
        skip: Math.floor(pagination.limit * pagination.page - pagination.limit),
      }),
      this.orm.product.count({ where }),
      brandId
        ? this.orm.brand.findUniqueOrThrow({
            where: {
              id: brandId,
            },
          })
        : undefined,
      categoryId
        ? this.orm.category.findUniqueOrThrow({
            where: {
              id: categoryId,
            },
          })
        : undefined,
    ]);

    if (!products.length || !totalCount) {
      throw new GrpcNotFoundException('Not Found');
    }

    return {
      products,
      brand,
      category,
      pagination: {
        ...pagination,
        totalCount,
      },
    };
  }
}
