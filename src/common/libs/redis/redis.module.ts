import { DynamicModule, Module } from '@nestjs/common';
import { ClusterNode, ClusterOptions, RedisOptions } from 'ioredis';

import { createClient, createClusterClient } from './redis.provider';
import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static register(options: RedisOptions): DynamicModule {
    return {
      module: RedisModule,
      providers: [createClient(options), RedisService],
      exports: [RedisService],
      global: true,
    };
  }

  static registerCluster(options: {
    startupNodes: ClusterNode[];
    options?: ClusterOptions;
  }): DynamicModule {
    return {
      module: RedisModule,
      providers: [createClusterClient(options), RedisService],
      exports: [RedisService],
      global: true,
    };
  }
}
