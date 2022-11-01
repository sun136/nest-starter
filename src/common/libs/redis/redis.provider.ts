import { APP_REDIS_CLIENT } from '@app/common/constants/provide';
import { Logger, Provider } from '@nestjs/common';
import chalk from 'chalk';
import Redis, { ClusterNode, ClusterOptions, RedisOptions } from 'ioredis';

const logger = new Logger('RedisModule');

export const createClient = (options: RedisOptions = {}): Provider => {
  return {
    provide: APP_REDIS_CLIENT,
    useFactory: () => {
      const timestampStart = +new Date();
      const redis = new Redis(options);
      redis.on('connect', () => {
        const timestampEnd = +new Date();
        const timeConsuming = timestampEnd - timestampStart;
        logger.log(`Redis successfully connected ${chalk.yellow(`${timeConsuming}ms`)}`);
      });
      redis.on('error', (error) => {
        logger.error(error);
      });
      return redis;
    },
  };
};

export const createClusterClient = (options: {
  startupNodes: ClusterNode[];
  options?: ClusterOptions;
}): Provider => {
  return {
    provide: APP_REDIS_CLIENT,
    useFactory: () => {
      const timestampStart = +new Date();
      const redis = new Redis.Cluster(options.startupNodes, options.options);
      redis.on('connect', () => {
        const timestampEnd = +new Date();
        const timeConsuming = timestampEnd - timestampStart;
        logger.log(`Redis Cluster successfully connected ${chalk.yellow(`${timeConsuming}ms`)}`);
      });
      redis.on('error', (error) => {
        logger.error(error);
      });
      return redis;
    },
  };
};
