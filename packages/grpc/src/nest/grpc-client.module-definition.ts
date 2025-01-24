import { ConfigurableModuleBuilder } from '@nestjs/common';

interface ModuleOptions {
  packageName: string;
  url: string;
}

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<ModuleOptions>().build();
