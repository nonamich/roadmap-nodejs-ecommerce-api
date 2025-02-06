import { Injectable } from '@nestjs/common';
import { GrpcNotFoundException } from '@repo/grpc/nest';
import { from, mergeAll, Observable } from 'rxjs';
import {
  GetFeaturedProductsRequestDto,
  GetProductByIdRequestDto,
  GetProductsByFilterRequestDto,
  GetProductsByIdsRequestDto,
} from './dto/requests';
import { ProductsResponseDto } from './dto/responses';
import { ProductEntity } from './entities/product.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

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
  }: GetFeaturedProductsRequestDto): Promise<ProductsResponseDto> {
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
  }: GetProductsByFilterRequestDto): Promise<ProductsResponseDto> {
    const where = {
      brandId,
      categoryId,
    };
    const [products, totalCount] = await Promise.all([
      this.productsRepository.findMany({
        where: where,
        take: pagination.limit,
        skip: Math.floor(pagination.limit * pagination.page - pagination.limit),
      }),
      this.productsRepository.count({ where }),
    ]);

    if (!products.length || !totalCount) {
      throw new GrpcNotFoundException('Product Not Found');
    }

    return {
      products,
      pagination: {
        ...pagination,
        totalCount,
      },
    };
  }

  async decrementalAmount(productId: number, quantity: number): Promise<void> {
    await this.productsRepository.update({
      data: {
        amount: {
          decrement: quantity,
        },
      },
      where: {
        id: productId,
      },
    });
  }
}
