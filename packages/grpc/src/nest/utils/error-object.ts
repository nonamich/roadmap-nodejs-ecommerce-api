import type { status as GrpcStatusCode } from '@grpc/grpc-js';
import { GrpcBaseException } from '../exceptions';

export type GrpcExceptionMessage = {
  message: string;
  code: GrpcStatusCode;
  exception: string;
};

export function createGrpcExceptionObject(
  message: string,
  code: GrpcStatusCode,
) {
  return {
    message: createMessage({
      exception: GrpcBaseException.name,
      message,
      code,
    }),
    code,
  };
}

function createMessage(obj: GrpcExceptionMessage) {
  return JSON.stringify(obj);
}
