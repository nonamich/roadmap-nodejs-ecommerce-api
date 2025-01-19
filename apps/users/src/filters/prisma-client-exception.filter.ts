import * as grpc from '@grpc/grpc-js';
import { Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { throwError } from 'rxjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2018':
      case 'P2025':
        return throwError(
          () =>
            new RpcException({
              code: grpc.status.NOT_FOUND,
              message: 'Resource not found',
            }),
        );
      case 'P2002':
        return throwError(
          () =>
            new RpcException({
              code: grpc.status.ALREADY_EXISTS,
              message: 'Resource Already Exists',
            }),
        );
    }

    return throwError(
      () =>
        new RpcException({
          code: grpc.status.UNKNOWN,
        }),
    );
  }
}
