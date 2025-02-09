import { Injectable } from '@nestjs/common';
import { GrpcNotFoundException } from '@packages/grpc/nest';
import { GetProductBySlugRequest } from '@packages/grpc/pb/product';
import { Prisma } from '@prisma/client/product/index.js';
import { BrandsRepository } from '../brands/brands.repository';
import { BrandEntity } from '../brands/entities';
import { CategoriesRepository } from '../categories/categories.repository';
import { CategoryEntity } from '../categories/entities';
import {
  GetBrandBySlugRequestDto,
  GetCategoryBySlugRequestDto,
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
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesRepository: CategoriesRepository,
    private readonly brandsRepository: BrandsRepository,
  ) {}

  async getProductById({
    id,
  }: GetProductByIdRequestDto): Promise<ProductEntity> {
    return await this.productsRepository.findUniqueOrThrow({ id });
  }

  async getProductsByIds({
    ids,
  }: GetProductsByIdsRequestDto): Promise<ProductEntity[]> {
    return await this.productsRepository.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
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
          amount: {
            gt: 0,
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
    brandSlug,
    categorySlug,
  }: GetProductsByFilterRequestDto): Promise<ProductsResponseDto> {
    const where: Prisma.ProductWhereInput = {
      brand: {
        slug: brandSlug,
      },
      category: {
        slug: categorySlug,
      },
      amount: {
        gt: 0,
      },
    };
    const [products, totalCount] = await Promise.all([
      this.productsRepository.findMany({
        where,
        take: pagination.limit,
        skip: Math.floor(pagination.limit * pagination.page - pagination.limit),
      }),
      this.productsRepository.count({ where }),
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

  async decrementAmount(productId: string, quantity: number): Promise<void> {
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

  async incrementAmount(productId: string, quantity: number): Promise<void> {
    await this.productsRepository.update({
      data: {
        amount: {
          increment: quantity,
        },
      },
      where: {
        id: productId,
      },
    });
  }

  async getProductBySlug({
    slug,
  }: GetProductBySlugRequest): Promise<ProductEntity> {
    return await this.productsRepository.findUniqueOrThrow({
      slug,
    });
  }

  async getBrandBySlug({
    slug,
  }: GetBrandBySlugRequestDto): Promise<BrandEntity> {
    return await this.brandsRepository.findUniqueOrThrow({
      slug,
    });
  }

  async getCategoryBySlug({
    slug,
  }: GetCategoryBySlugRequestDto): Promise<CategoryEntity> {
    return await this.categoriesRepository.findUniqueOrThrow({
      slug,
    });
  }
}
