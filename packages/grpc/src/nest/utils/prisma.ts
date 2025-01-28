import {
  GrpcAlreadyExistsException,
  GrpcNotFoundException,
  GrpcUnknownException,
} from '../exceptions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prismaToGrpcError = (code: string, context?: any) => {
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
