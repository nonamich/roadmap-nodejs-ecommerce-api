import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  ProductServiceController,
  ProductServiceControllerMethods,
} from '@repo/grpc/pb/product';
import { Observable } from 'rxjs';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters';
import {
  GetFeaturedProductsRequestDto,
  GetProductByIdRequestDto,
  GetProductBySlugRequestDto,
  GetProductsByFilterRequestDto,
  GetProductsByIdsRequestDto,
} from './dto/requests';
import { ProductResponseDto, ProductsResponseDto } from './dto/responses';
import { ProductService } from './products.services';

@GrpcService()
@ProductServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
export class ProductsGrpcController implements ProductServiceController {
  constructor(private readonly service: ProductService) {}

  async getProductById(
    @GrpcPayload() dto: GetProductByIdRequestDto,
  ): Promise<ProductResponseDto> {
    return await this.service.getProductById(dto);
  }

  getProductsByIds(
    @GrpcPayload() dto: GetProductsByIdsRequestDto,
  ): Observable<ProductResponseDto> {
    return this.service.getProductsByIds(dto);
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
}
