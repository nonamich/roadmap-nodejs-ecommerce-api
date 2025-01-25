import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  providers: [
    // {
    //   provide: APP_PIPE,
    //   useClass: DefaultValidationPipe,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: GrpcServerExceptionFilter,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: GrpcToHttpInterceptor,
    // },
  ],
  imports: [
    // ConfigModule.forRoot({ isGlobal: true }),
    // AuthModule,
    // UsersModule,
    // ProductsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
