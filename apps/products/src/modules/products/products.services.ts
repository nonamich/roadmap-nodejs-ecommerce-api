import { Injectable } from '@nestjs/common';
import { GrpcNotFoundException } from '@repo/grpc/nest';
import {
  ProductsByFilterResponse,
  ProductsResponse,
} from '@repo/grpc/proto/products';
import { from, mergeAll, Observable } from 'rxjs';
import { BrandsRepository } from '../brands/brands.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import {
  GetFeaturedProductsRequestDto,
  GetProductByIdRequestDto,
  GetProductsByFilterRequestDto,
  GetProductsByIdsRequestDto,
} from './dto';
import { ProductEntity } from './product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly brandsRepository: BrandsRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async getProductById({
    id,
  }: GetProductByIdRequestDto): Promise<ProductEntity> {
    return await this.productsRepository.findUniqueOrThrow({ id });
  }

  getProductsByIds({
    ids,
  }: GetProductsByIdsRequestDto): Observable<ProductEntity> {
    const promise = this.productsRepository.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return from(promise).pipe(mergeAll());
  }

  async getFeaturedProducts({
    pagination,
  }: GetFeaturedProductsRequestDto): Promise<ProductsResponse> {
    const [products, totalCount] = await Promise.all([
      this.productsRepository.findMany({
        where: {
          featuredProduct: {
            is: {},
          },
        },
        take: pagination.limit,
        skip: Math.floor(pagination.limit * pagination.page - pagination.limit),
      }),
      this.productsRepository.count(),
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

  async getProductsByFilter({
    pagination,
    brandId,
    categoryId,
  }: GetProductsByFilterRequestDto): Promise<ProductsByFilterResponse> {
    const where = {
      brandId,
      categoryId,
    };
    const [products, totalCount, brand, category] = await Promise.all([
      this.productsRepository.findMany({
        where: where,
        take: pagination.limit,
        skip: Math.floor(pagination.limit * pagination.page - pagination.limit),
      }),
      this.productsRepository.count({ where }),
      brandId
        ? this.brandsRepository.findUniqueOrThrow({
            id: brandId,
          })
        : undefined,
      categoryId
        ? this.categoriesRepository.findUniqueOrThrow({
            id: categoryId,
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
