import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  PRODUCTS_SERVICE_NAME,
  ProductsServiceClient,
} from '@repo/grpc/proto/products';
import { Observable } from 'rxjs';
import {
  GetFeaturedProductsRequestDto,
  GetProductByIdRequestDto,
  GetProductsByFilterRequestDto,
} from './dto';
import {
  ProductEntity,
  ProductsByFilterEntity,
  ProductsEntity,
} from './entities';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE_NAME)
    private readonly productsService: ProductsServiceClient,
  ) {}

  @ApiOkResponse({ type: ProductsEntity })
  @Get('/featured')
  getFeaturedProducts(
    @Query() request: GetFeaturedProductsRequestDto,
  ): Observable<ProductsEntity> {
    return this.productsService.getFeaturedProducts(request);
  }

  @ApiOkResponse({ type: ProductEntity })
  @Get('/:id')
  getProductById(
    @Param() request: GetProductByIdRequestDto,
  ): Observable<ProductEntity> {
    return this.productsService.getProductById(request);
  }

  @ApiOkResponse({ type: ProductsByFilterEntity })
  @Get('/')
  getProductsByFilter(
    @Query() request: GetProductsByFilterRequestDto,
  ): Observable<ProductsByFilterEntity> {
    return this.productsService.getProductsByFilter(request);
  }
}
