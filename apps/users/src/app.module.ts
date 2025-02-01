import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ORMModule } from './modules/orm/orm.module';
import { UsersModule } from './modules/users/users.module';

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
