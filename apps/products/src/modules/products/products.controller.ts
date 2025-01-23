import { Controller, UseFilters } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import {
  ProductsServiceController,
  ProductsServiceControllerMethods,
} from '@packages/grpc/proto/products';
import { from, mergeAll } from 'rxjs';
import { PrismaClientExceptionFilter } from '~/filters/prisma-client-exception.filter';
import { ORMService } from '~/modules/orm/orm.service';
import { GrpcValidationPipe } from '~/pipes/grpc-validation-pipe';
import { GetProductByIdRequestDto, GetProductsByFilterRequestDto } from './dto';
import { PRODUCTS_SELECT } from './products.constants';

@Controller()
@ProductsServiceControllerMethods()
export class ProductsController implements ProductsServiceController {
  constructor(private readonly orm: ORMService) {}

  @UseFilters(PrismaClientExceptionFilter)
  async getProductById(
    @Payload(GrpcValidationPipe) { id }: GetProductByIdRequestDto,
  ) {
    const product = await this.orm.product.findUniqueOrThrow({
      where: { id },
      select: PRODUCTS_SELECT,
    });

    return product;
  }

  @UseFilters(PrismaClientExceptionFilter)
  getProductsByFilter(
    @Payload(GrpcValidationPipe)
    { brandId, categoryId }: GetProductsByFilterRequestDto,
  ) {
    const promise = this.orm.product.findMany({
      select: PRODUCTS_SELECT,
      where: {
        brandId: brandId || undefined,
        categoryId: categoryId || undefined,
      },
      take: 100,
    });

    return from(promise).pipe(mergeAll());
  }
}
