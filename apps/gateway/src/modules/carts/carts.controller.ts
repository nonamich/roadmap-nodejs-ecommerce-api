import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthorizedUser } from '../auth/auth.interface';
import { CurrentUser } from '../auth/decorators/authorized-user.decorator';
import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CartsService } from './carts.service';
import { AddToCartRequestDto, CartResponseDto } from './dto';

@ApiTags('cart')
@Controller('cart')
export class CartsController {
  constructor(private readonly service: CartsService) {}

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Get()
  async getCart(@CurrentUser() user: AuthorizedUser) {
    return await this.service.getCart(user);
  }

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Post('/product/:productId')
  async addToCart(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: AddToCartRequestDto,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.service.addToCart(productId, dto, user);
  }

  @ApiOkResponse({ type: CartResponseDto })
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @Delete('/product/:productId')
  async removeFromCart(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() user: AuthorizedUser,
  ) {
    return await this.service.removeFromCart(productId, user);
  }
}
