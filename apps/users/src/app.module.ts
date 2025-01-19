import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ORMModule } from './modules/orm/orm.module';
import { UsersModule } from './modules/users/users.module';
import { GrpcValidationPipe } from './pipes/grpc-validation-pipe';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ORMModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: GrpcValidationPipe,
    },
  ],
})
export class AppModule {}
