import {
  GrpcAlreadyExistsException,
  GrpcBaseException,
  GrpcNotFoundException,
  GrpcUnknownException,
} from '../exceptions';

export const prismaToGrpcError = (
  code: string,
  context?: unknown,
): GrpcBaseException => {
  const messagePrefix = context ? `[${context}] ` : '';

  switch (code) {
    case 'P2018':
    case 'P2025':
      return new GrpcNotFoundException(`${messagePrefix}Not Found`);
    case 'P2002':
      return new GrpcAlreadyExistsException(`${messagePrefix}Already Exists`);
  }

  return new GrpcUnknownException(`${messagePrefix}Something wrong`);
};
