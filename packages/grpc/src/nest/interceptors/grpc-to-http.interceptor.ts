/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GrpcBaseException } from '../exceptions';
import { GrpcExceptionMessage, HTTP_CODE_FROM_GRPC } from '../utils';

@Injectable()
export class GrpcToHttpInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        if (
          !(
            typeof err === 'object' &&
            'details' in err &&
            err.details &&
            typeof err.details === 'string'
          )
        ) {
          return throwError(() => err);
        }

        try {
          const details: GrpcExceptionMessage = JSON.parse(err.details);

          if (details.exception !== GrpcBaseException.name)
            return throwError(() => err);

          const statusCode =
            HTTP_CODE_FROM_GRPC[err.code] || HttpStatus.INTERNAL_SERVER_ERROR;

          return throwError(
            () =>
              new HttpException(
                {
                  message: details.message,
                  statusCode,
                  error: HttpStatus[statusCode],
                },
                statusCode,
                {
                  cause: err,
                },
              ),
          );
        } catch {
          return throwError(() => err);
        }
      }),
    );
  }
}
