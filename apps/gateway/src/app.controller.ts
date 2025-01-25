import { Controller, Get, Query } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  get(@Query() query: any) {
    return query;
  }
}
