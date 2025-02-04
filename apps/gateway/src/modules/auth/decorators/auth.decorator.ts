import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';

export function Auth(): ReturnType<typeof applyDecorators> {
  return applyDecorators(
    ApiBearerAuth(),
    UseGuards(JWTAuthGuard),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
