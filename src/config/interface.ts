import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ClusterNode, ClusterOptions, RedisOptions } from 'ioredis';

interface AppOptions {
  port: number;
  prefix?: string;
}

export interface ConfigOptions {
  app: Readonly<AppOptions>;
  throttler?: Readonly<ThrottlerModuleOptions>;
  mysql?: Readonly<TypeOrmModuleOptions>;
  redis?: Readonly<RedisOptions>;
  redisCluster?: Readonly<{ startupNodes: ClusterNode[]; options?: ClusterOptions }>;
}
