import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { AuthorizedUser } from '../auth.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthorizedUser | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (request.user) {
      const { id, email, name } = request.user;

      return { id, email, name };
    }
  },
);
