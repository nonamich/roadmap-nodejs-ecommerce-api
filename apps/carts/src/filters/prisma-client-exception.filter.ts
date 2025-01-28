import { Catch, ExceptionFilter } from '@nestjs/common';
import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
  GrpcUnknownException,
} from 'nestjs-grpc-exceptions';
import { Prisma } from 'prisma-client';
import { throwError } from 'rxjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError) {
    switch (exception.code) {
      case 'P2018':
      case 'P2025':
        return throwError(() => new GrpcNotFoundException('Not Found'));
      case 'P2002':
        return throwError(
          () => new GrpcAlreadyExistsException('Already Exists'),
        );
    }

    return throwError(() => new GrpcUnknownException('Something wrong'));
  }
}
