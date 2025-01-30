import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CartsServiceClient } from '@packages/grpc/proto/carts';
import { ProductsServiceClient } from '@packages/grpc/proto/products';
import { firstValueFrom } from 'rxjs';
import { AuthorizedUser } from '../auth/auth.interface';
import { CurrentUser } from '../auth/decorators/authorized-user.decorator';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PRODUCTS_SERVICE_PROVIDER_TOKEN } from '../products/products.constants';
import { CARTS_SERVICE_PROVIDER_TOKEN } from './carts.constants';
import { AddToCartRequestDto, CartResponseDto } from './dto';

@ApiTags('cart')
@Controller('cart')
export class CartsController {
  constructor(
    @Inject(CARTS_SERVICE_PROVIDER_TOKEN)
    private readonly cartsService: CartsServiceClient,

    @Inject(PRODUCTS_SERVICE_PROVIDER_TOKEN)
    private readonly productsService: ProductsServiceClient,
  ) {}

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get()
  async getCart(@CurrentUser() { id: userId }: AuthorizedUser) {
    const cart = await firstValueFrom(this.cartsService.getCart({ userId }));

    return cart;
  }

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Post('/product/:productId')
  addToCart(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() { quantity }: AddToCartRequestDto,
    @CurrentUser() { id: userId }: AuthorizedUser,
  ) {
    return this.cartsService.addToCart({ userId, productId, quantity });
  }

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Delete('/product/:productId')
  removeFromCart(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() { id: userId }: AuthorizedUser,
  ) {
    return this.cartsService.removeFromCart({ userId, productId });
  }
}
