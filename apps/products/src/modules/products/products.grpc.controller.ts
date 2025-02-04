import { UseFilters } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { GrpcPayload, GrpcToGrpcExceptionFilter } from '@repo/grpc/nest';
import {
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
} from './dto/requests';
import { ProductsResponseDto } from './dto/responses';
import { ProductEntity } from './entities/product.entity';
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
  ): Promise<ProductsResponseDto> {
    return this.service.getFeaturedProducts(dto);
  }

  async getProductsByFilter(
    @GrpcPayload() dto: GetProductsByFilterRequestDto,
  ): Promise<ProductsResponseDto> {
    return this.service.getProductsByFilter(dto);
  }
}
