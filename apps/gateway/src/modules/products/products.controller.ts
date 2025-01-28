import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProductsServiceClient } from '@packages/grpc/proto/products';
import {
  GetFeaturedProductsRequestDto,
  GetProductByIdRequestDto,
  GetProductsByFilterRequestDto,
  ProductResponseDto,
  ProductsResponseDto,
} from './dto';
import { ProductsByFilterResponseDto } from './dto/product-by-filter-response.dto';
import { PRODUCTS_SERVICE_PROVIDER_TOKEN } from './products.constants';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE_PROVIDER_TOKEN)
    private readonly productsService: ProductsServiceClient,
  ) {}

  @ApiOkResponse({ type: ProductsResponseDto })
  @Get('/featured')
  getFeaturedProducts(@Query() request: GetFeaturedProductsRequestDto) {
    return this.productsService.getFeaturedProducts(request);
  }

  @ApiOkResponse({ type: ProductResponseDto })
  @Get('/:id')
  getProductById(@Param() request: GetProductByIdRequestDto) {
    return this.productsService.getProductById(request);
  }

  @ApiOkResponse({ type: ProductsByFilterResponseDto })
  @Get('/')
  getProductsByFilter(@Query() request: GetProductsByFilterRequestDto) {
    return this.productsService.getProductsByFilter(request);
  }
}
