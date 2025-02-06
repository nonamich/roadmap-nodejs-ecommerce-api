import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
} from '@repo/grpc/pb/product';
import { Observable } from 'rxjs';
import {
  GetFeaturedProductsRequestDto,
  GetProductBySlugRequestDto,
  GetProductsByFilterRequestDto,
} from './dto/requests';
import { ProductResponseDto, ProductsResponseDto } from './dto/responses';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE_NAME)
    private readonly productService: ProductServiceClient,
  ) {}

  @ApiOkResponse({ type: ProductsResponseDto })
  @Get('/featured')
  getFeaturedProducts(
    @Query() request: GetFeaturedProductsRequestDto,
  ): Observable<ProductsResponseDto> {
    return this.productService.getFeaturedProducts(request);
  }

  @ApiOkResponse({ type: ProductResponseDto })
  @Get('/:slug')
  getProductById(
    @Param() request: GetProductBySlugRequestDto,
  ): Observable<ProductResponseDto> {
    return this.productService.getProductBySlug(request);
  }

  @ApiOkResponse({ type: ProductsResponseDto })
  @Get('/')
  getProductsByFilter(
    @Query() request: GetProductsByFilterRequestDto,
  ): Observable<ProductsResponseDto> {
    return this.productService.getProductsByFilter(request);
  }
}
