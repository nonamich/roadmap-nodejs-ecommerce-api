import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
  ProductsByFilterResponse,
  ProductsResponse,
  ProductsServiceController,
  ProductsServiceControllerMethods,
} from '@repo/grpc/proto/products';
import { Observable } from 'rxjs';
import { PrismaClientExceptionFilter } from '~/modules/orm/filters';
import {
  GetFeaturedProductsRequestDto,
  GetProductByIdRequestDto,
  GetProductsByFilterRequestDto,
  GetProductsByIdsRequestDto,
} from './dto';
import { ProductEntity } from './product.entity';
import { ProductsService } from './products.services';

@GrpcService()
@ProductsServiceControllerMethods()
@UseFilters(GrpcToGrpcExceptionFilter, PrismaClientExceptionFilter)
export class ProductsGrpcController implements ProductsServiceController {
  constructor(private readonly service: ProductsService) {}

  async getProductById(
    @GrpcPayload() dto: GetProductByIdRequestDto,
  ): Promise<ProductEntity> {
    return await this.service.getProductById(dto);
  }

  getProductsByIds(
    @GrpcPayload() dto: GetProductsByIdsRequestDto,
  ): Observable<ProductEntity> {
    return this.service.getProductsByIds(dto);
  }

  async getFeaturedProducts(
    @GrpcPayload() dto: GetFeaturedProductsRequestDto,
  ): Promise<ProductsResponse> {
    return this.service.getFeaturedProducts(dto);
  }

  async getProductsByFilter(
    @GrpcPayload() dto: GetProductsByFilterRequestDto,
  ): Promise<ProductsByFilterResponse> {
    return this.service.getProductsByFilter(dto);
  }
}
