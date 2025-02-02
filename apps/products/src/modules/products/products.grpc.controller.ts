import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import {
  GrpcNotFoundException,
  GrpcPayload,
  GrpcToGrpcExceptionFilter,
} from '@repo/grpc/nest';
import {
  ProductsServiceController,
  ProductsServiceControllerMethods,
} from '@repo/grpc/proto/products';
import { mergeAll } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import { ORMService } from '~/modules/orm/orm.service';
import {
  GetFeaturedProductsRequestDto,
  GetProductByIdRequestDto,
  GetProductsByFilterRequestDto,
  GetProductsByIdsRequestDto,
} from './dto';
import { PRODUCTS_SELECT } from './products.constants';

@GrpcService()
@ProductsServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
export class ProductsGrpcController implements ProductsServiceController {
  constructor(private readonly orm: ORMService) {}

  async getProductById(@GrpcPayload() { id }: GetProductByIdRequestDto) {
    const product = await this.orm.product.findUniqueOrThrow({
      where: { id },
      select: PRODUCTS_SELECT,
    });

    return product;
  }

  getProductsByIds(@GrpcPayload() { ids }: GetProductsByIdsRequestDto) {
    const promise = this.orm.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      select: PRODUCTS_SELECT,
    });

    return fromPromise(promise).pipe(mergeAll());
  }

  async getFeaturedProducts(
    @GrpcPayload() { pagination }: GetFeaturedProductsRequestDto,
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
      throw new GrpcNotFoundException('Products Not Found');
    }

    return {
      products,
      pagination: {
        ...pagination,
        totalCount,
      },
    };
  }

  async getProductsByFilter(
    @GrpcPayload()
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
      throw new GrpcNotFoundException('Product Not Found');
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
