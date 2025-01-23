import { Controller, UseFilters } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  Product,
  ProductsServiceController,
  ProductsServiceControllerMethods,
} from '@packages/grpc';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import { ORMService } from '~/modules/orm/orm.service';
import { GrpcValidationPipe } from '~/pipes/grpc-validation-pipe';
import { GetProductByIdRequestDto } from './dto';
import { PRODUCTS_SELECT } from './products.constants';

@Controller()
@ProductsServiceControllerMethods()
export class ProductsController implements ProductsServiceController {
  constructor(private readonly orm: ORMService) {}

  // @UseFilters(PrismaClientExceptionFilter)
  // async createUser(
  //   @Payload(GrpcValidationPipe)
  //   { email, name, password: unsanitizedPassword }: CreateUserRequestDto,
  // ) {}

  @UseFilters(PrismaClientExceptionFilter)
  async getProductById(
    @Payload(GrpcValidationPipe) { id }: GetProductByIdRequestDto,
  ): Promise<Product> {
    const product = await this.orm.product.findUniqueOrThrow({
      where: { id },
      select: PRODUCTS_SELECT,
    });

    return product;
  }
}
