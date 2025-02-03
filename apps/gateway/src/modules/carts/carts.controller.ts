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
import { CartsService } from './carts.service';
import { AddToCartRequestDto } from './dto';
import { CartEntity } from './entities';

@ApiTags('cart')
@Controller('cart')
export class CartsController {
  constructor(private readonly service: CartsService) {}

  @ApiOkResponse({ type: CartEntity })
  @Auth()
  @Get()
  async getCart(@CurrentUser() user: AuthorizedUser): Promise<CartEntity> {
    return await this.service.getCart(user);
  }

  @ApiOkResponse({ type: CartEntity })
  @Auth()
  @Post('/product/:productId')
  async addToCart(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: AddToCartRequestDto,
    @CurrentUser() user: AuthorizedUser,
  ): Promise<CartEntity> {
    return await this.service.addToCart(productId, dto, user);
  }

  @ApiOkResponse({ type: CartEntity })
  @Auth()
  @Delete('/product/:productId')
  async removeFromCart(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() user: AuthorizedUser,
  ): Promise<CartEntity> {
    return await this.service.removeFromCart(productId, user);
  }
}
