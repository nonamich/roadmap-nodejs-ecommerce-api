import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
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
import {
  AddToCartRequestDto,
  CartResponseDto,
  RemoveFromCartRequestDto,
  UpdateQuantityRequestDto,
} from './dto';

@ApiTags('cart')
@Controller('cart')
export class CartsController {
  constructor(
    @Inject(CARTS_SERVICE_PROVIDER_TOKEN)
    private readonly cartsService: CartsServiceClient,
  ) {}

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get()
  getCart(@CurrentUser() { id: userId }: AuthorizedUser) {
    return this.cartsService.getCart({ userId });
  }

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Post()
  addToCart(
    @Body() { productId, quantity }: AddToCartRequestDto,
    @CurrentUser() { id: userId }: AuthorizedUser,
  ) {
    return this.cartsService.addToCart({ userId, productId, quantity });
  }

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Put('/:productId')
  updateQuantity(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() { quantity }: UpdateQuantityRequestDto,
    @CurrentUser() { id: userId }: AuthorizedUser,
  ) {
    return this.cartsService.updateQuantity({ userId, productId, quantity });
  }

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Delete()
  removeFromCart(
    @Body() body: RemoveFromCartRequestDto,
    @CurrentUser() { id: userId }: AuthorizedUser,
  ) {
    return this.cartsService.removeFromCart({ userId, ...body });
  }
}
