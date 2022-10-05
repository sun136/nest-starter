import { ResultData } from '@app/common/utils/result';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Record<string, any>> {
    const userList = await this.userRepository.find();
    return ResultData.ok(instanceToPlain(userList));
  }
}
