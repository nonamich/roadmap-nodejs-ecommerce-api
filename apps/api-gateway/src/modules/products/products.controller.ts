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
} from './dto/requests';
import { ProductResponseDto, ProductsResponseDto } from './dto/responses';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE_NAME)
    private readonly productsService: ProductsServiceClient,
  ) {}

  @ApiOkResponse({ type: ProductsResponseDto })
  @Get('/featured')
  getFeaturedProducts(
    @Query() request: GetFeaturedProductsRequestDto,
  ): Observable<ProductsResponseDto> {
    return this.productsService.getFeaturedProducts(request);
  }

  @ApiOkResponse({ type: ProductResponseDto })
  @Get('/:id')
  getProductById(
    @Param() request: GetProductByIdRequestDto,
  ): Observable<ProductResponseDto> {
    return this.productsService.getProductById(
      request,
    ) as Observable<ProductResponseDto>;
  }

  @ApiOkResponse({ type: ProductsResponseDto })
  @Get('/')
  getProductsByFilter(
    @Query() request: GetProductsByFilterRequestDto,
  ): Observable<ProductsResponseDto> {
    return this.productsService.getProductsByFilter(request);
  }
}
