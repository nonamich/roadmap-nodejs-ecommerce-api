import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CartsServiceClient } from '@packages/grpc/proto/carts';
import { AuthorizedUser } from '../auth/auth.interface';
import { CurrentUser } from '../auth/decorators/authorized-user.decorator';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CARTS_SERVICE_PROVIDER_TOKEN } from './carts.constants';
import { CartResponseDto, GetCartQuantityResponseDto } from './dto';
import { AddProductToCartRequestDto } from './dto/add-product-to-cart-request.dto';
import { RemoveProductRequestDto } from './dto/remove-product-request.dto';
import { UpdateProductQuantityRequestDto } from './dto/update-product-quantity-request.dto';

@ApiTags('cart')
@Controller('cart')
export class CartsController {
  constructor(
    @Inject(CARTS_SERVICE_PROVIDER_TOKEN)
    private readonly cartsService: CartsServiceClient,
  ) {}

  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @ApiOkResponse({ type: GetCartQuantityResponseDto })
  @Get('/quantity')
  getCartQuantity(@CurrentUser() { id: userId }: AuthorizedUser) {
    return this.cartsService.getCartQuantityByUserId({ userId });
  }

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get()
  getCart(@CurrentUser() { id: userId }: AuthorizedUser) {
    return this.cartsService.getCartByUserId({ userId });
  }

  @ApiOkResponse({ type: GetCartQuantityResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Post()
  addToCart(
    @Body() { productId, quantity }: AddProductToCartRequestDto,
    @CurrentUser() { id: userId }: AuthorizedUser,
  ) {
    return this.cartsService.addProductToCart({ userId, productId, quantity });
  }

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Put()
  updateProductQuantity(
    @Body() body: UpdateProductQuantityRequestDto,
    @CurrentUser() { id: userId }: AuthorizedUser,
  ) {
    return this.cartsService.updateProductQuantity({ userId, ...body });
  }

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Delete()
  removeProduct(
    @Body() body: RemoveProductRequestDto,
    @CurrentUser() { id: userId }: AuthorizedUser,
  ) {
    return this.cartsService.removeProduct({ userId, ...body });
  }
}
