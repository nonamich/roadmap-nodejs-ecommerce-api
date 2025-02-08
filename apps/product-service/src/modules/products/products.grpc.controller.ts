import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  ProductServiceController,
  ProductServiceControllerMethods,
} from '@repo/grpc/pb/product';
import { from, mergeAll, Observable } from 'rxjs';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters';
import {
  GetBrandBySlugRequestDto,
  GetCategoryBySlugRequestDto,
  GetFeaturedProductsRequestDto,
  GetProductByIdRequestDto,
  GetProductBySlugRequestDto,
  GetProductsByFilterRequestDto,
  GetProductsByIdsRequestDto,
} from './dto/requests';
import {
  BrandResponseDto,
  CategoryResponseDto,
  ProductResponseDto,
  ProductsResponseDto,
} from './dto/responses';
import { ProductsService } from './products.services';

@GrpcService()
@ProductServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
export class ProductsGrpcController implements ProductServiceController {
  constructor(private readonly service: ProductsService) {}

  async getProductById(
    @GrpcPayload() dto: GetProductByIdRequestDto,
  ): Promise<ProductResponseDto> {
    return await this.service.getProductById(dto);
  }

  getProductsByIds(
    @GrpcPayload() dto: GetProductsByIdsRequestDto,
  ): Observable<ProductResponseDto> {
    const promise = this.service.getProductsByIds(dto);

    return from(promise).pipe(mergeAll());
  }

  async getFeaturedProducts(
    @GrpcPayload() dto: GetFeaturedProductsRequestDto,
  ): Promise<ProductsResponseDto> {
    return this.service.getFeaturedProducts(dto);
  }

  async getProductsByFilter(
    @GrpcPayload() dto: GetProductsByFilterRequestDto,
  ): Promise<ProductsResponseDto> {
    return this.service.getProductsByFilter(dto);
  }

  async getProductBySlug(
    dto: GetProductBySlugRequestDto,
  ): Promise<ProductResponseDto> {
    return await this.service.getProductBySlug(dto);
  }

  async getBrandBySlug(
    dto: GetBrandBySlugRequestDto,
  ): Promise<BrandResponseDto> {
    return await this.service.getBrandBySlug(dto);
  }

  async getCategoryBySlug(
    dto: GetCategoryBySlugRequestDto,
  ): Promise<CategoryResponseDto> {
    return await this.service.getCategoryBySlug(dto);
  }
}
