import { ConsoleLogger } from '@nestjs/common';

export class InternalDisabledLogger extends ConsoleLogger {
  contextsToIgnore = [
    'InstanceLoader',
    'RouterExplorer',
    'RoutesResolver',
    'NestFactory',
  ];

  log(message: any, ...optionalParams: any[]): void {
    const context = this.getContextFromLog([message, ...optionalParams]);

    if (context && this.contextsToIgnore.includes(context)) {
      return;
    }

    super.log(message, ...optionalParams);
  }

  getContextFromLog(args: unknown[]): string | undefined {
    if (args?.length <= 1) {
      return this.context;
    }

    const lastElement = args[args.length - 1];
    const isContext = this.isString(lastElement);

    if (!isContext) {
      return this.context;
    }

    return lastElement;
  }

  isString(val: unknown): val is string {
    return typeof val === 'string';
  }
}
