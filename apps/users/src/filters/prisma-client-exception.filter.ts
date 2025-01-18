import grpc from '@grpc/grpc-js';
import { Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { throwError } from 'rxjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    Logger.error(exception.message);

    switch (exception.code) {
      case 'P2018': {
        return throwError(
          () =>
            new RpcException({
              code: grpc.status.NOT_FOUND,
              message: 'Resource not found',
            }),
        );
      }
    }

    return throwError(() => exception);
  }
}
