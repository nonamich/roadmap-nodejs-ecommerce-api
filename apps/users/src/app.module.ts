import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { ORMModule } from './modules/orm/orm.module';

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
