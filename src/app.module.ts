import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { RedisModule } from './common/libs/redis/redis.module';
import AppConfig from './config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ThrottlerModule.forRoot(AppConfig.throttler),
    TypeOrmModule.forRoot(AppConfig.mysql),
    RedisModule.register(AppConfig.redis),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
