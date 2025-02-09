import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { prismaToGrpcError } from '@packages/grpc/nest';
import { Prisma } from '@prisma-client/index.js';
import { Observable } from 'rxjs';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseRpcExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): Observable<undefined> {
    return super.catch(
      prismaToGrpcError(exception.code, exception.meta?.modelName),
      host,
    );
  }
}
