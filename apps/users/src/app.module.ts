import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ORMModule } from './orm/orm.module';
import { UsersModule } from './users/users.module';

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
})
export class AppModule {}
