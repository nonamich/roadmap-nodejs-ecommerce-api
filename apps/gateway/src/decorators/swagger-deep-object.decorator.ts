import { ApiPropertyOptions } from '@nestjs/swagger';
import { createApiPropertyDecorator } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export function ApiPropertyDeepObject(): PropertyDecorator {
  return createApiPropertyDecorator({
    style: 'deepObject',
  } as ApiPropertyOptions);
}
