import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizedUser } from '~/modules/auth/auth.interface';
import { Auth, CurrentUser } from '~/modules/auth/decorators';
import { CartService } from './carts.service';
import { AddToCartRequestDto } from './dto/requests';
import { CartResponseDto } from './dto/responses';

@ApiTags('cart')
@Controller('cart')
export class CartsController {
  constructor(private readonly service: CartService) {}

  @ApiOkResponse({ type: CartResponseDto })
  @Auth()
  @Get()
  async getCart(@CurrentUser() user: AuthorizedUser): Promise<CartResponseDto> {
    return await this.service.getCart(user);
  }

  @ApiOkResponse({ type: CartResponseDto })
  @Auth()
  @Post('/product/:productId')
  async addToCart(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: AddToCartRequestDto,
    @CurrentUser() user: AuthorizedUser,
  ): Promise<CartResponseDto> {
    return await this.service.addToCart(productId, dto, user);
  }

  @ApiOkResponse({ type: CartResponseDto })
  @Auth()
  @Delete('/product/:productId')
  async removeFromCart(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() user: AuthorizedUser,
  ): Promise<CartResponseDto> {
    return await this.service.removeFromCart(productId, user);
  }
}
