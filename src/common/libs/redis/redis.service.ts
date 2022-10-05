import { APP_REDIS_CLIENT } from '@app/common/constants/provide';
import { Inject, Injectable } from '@nestjs/common';
import Redis, { RedisKey, RedisValue } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject(APP_REDIS_CLIENT) private client: Redis) {}

  getClient(): Redis {
    return this.client;
  }

  isForbiddenKeys(keys: any) {
    const check = (k: any) => !k || k === '*';
    if (Array.isArray(keys)) {
      return keys.some(check);
    }
    return check(keys);
  }

  async set(key: RedisKey, val: RedisValue, seconds?: number): Promise<'OK' | null> {
    if (!seconds) return await this.client.set(key, val);
    return await this.client.set(key, val, 'EX', seconds);
  }

  async get(key: RedisKey): Promise<RedisValue> {
    if (this.isForbiddenKeys(key)) return null;
    return await this.client.get(key);
  }

  async del(...args: [keys: RedisKey[]]): Promise<number>;
  async del(...args: [...keys: RedisKey[]]): Promise<number>;
  async del(args: any): Promise<number> {
    if (this.isForbiddenKeys(args)) return null;
    return await this.client.del(args);
  }
}
