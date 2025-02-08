import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
} from '@/grpc/pb/product';
import { firstValueFrom, Observable } from 'rxjs';
import {
  GetFeaturedProductsRequestDto,
  GetProductBySlugRequestDto,
  GetProductsByFilterRequestDto,
} from './dto/requests';
import {
  ProductResponseDto,
  ProductsByFilterResponseDto,
  ProductsResponseDto,
} from './dto/responses';

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
  getProductBySlug(
    @Param() request: GetProductBySlugRequestDto,
  ): Observable<ProductResponseDto> {
    return this.productService.getProductBySlug(request);
  }

  @ApiOkResponse({ type: ProductsByFilterResponseDto })
  @Get('/')
  async getProductsByFilter(
    @Query() request: GetProductsByFilterRequestDto,
  ): Promise<ProductsByFilterResponseDto> {
    const [productsResponse, categoryResponse, brandResponse] =
      await Promise.all([
        firstValueFrom(this.productService.getProductsByFilter(request)),
        request.categorySlug
          ? firstValueFrom(
              this.productService.getCategoryBySlug({
                slug: request.categorySlug,
              }),
            ).catch(() => undefined)
          : undefined,
        request.brandSlug
          ? firstValueFrom(
              this.productService.getBrandBySlug({ slug: request.brandSlug }),
            ).catch(() => undefined)
          : undefined,
      ]);

    return {
      ...productsResponse,
      category: categoryResponse,
      brand: brandResponse,
    };
  }
}
