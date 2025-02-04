import type { status as GrpcStatusCode } from '@grpc/grpc-js';
import { GrpcBaseException } from '../exceptions';

export type GrpcExceptionMessage = {
  message: string;
  code: GrpcStatusCode;
  exception: string;
};

export type GrpcExceptionObject = {
  message: string;
  code: GrpcStatusCode;
};

export const createGrpcExceptionObject = (
  message: string,
  code: GrpcStatusCode,
): GrpcExceptionObject => {
  return {
    message: createMessage({
      exception: GrpcBaseException.name,
      message,
      code,
    }),
    code,
  };
};

function createMessage(obj: GrpcExceptionMessage): string {
  return JSON.stringify(obj);
}
