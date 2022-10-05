import { RedisService } from '@app/common/libs/redis/redis.service';
import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService, private redisService: RedisService) {}

  @Get()
  async getUser() {
    return await this.userService.findAll();
  }
}
