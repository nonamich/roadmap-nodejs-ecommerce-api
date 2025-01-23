import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './orm.module-definition';
import { ORMService } from './orm.service';

@Module({
  providers: [ORMService],
  exports: [ORMService],
})
export class ORMModule extends ConfigurableModuleClass {}
