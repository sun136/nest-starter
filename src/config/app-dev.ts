import { ConfigOptions } from './interface';

const config: ConfigOptions = {
  app: {
    port: 8080,
  },

  throttler: {
    ttl: 60 * 5,
    limit: 300,
    ignoreUserAgents: [/googlebot/gi, /bingbot/gi, /baidubot/gi],
  },

  mysql: {
    entities: ['dist/modules/**/*.entity{.ts,.js}'],
    synchronize: true,

    logger: 'advanced-console',
    logging: true,
    maxQueryExecutionTime: 0,

    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root123',
    database: 'awesome',
    charset: 'utf8mb4',
    supportBigNumbers: true,
    bigNumberStrings: true,
    dropSchema: false,
  },

  redis: {
    host: '127.0.0.1',
    port: 6379,
    retryStrategy: () => 10000,
    sentinelReconnectStrategy: () => 10,
  },
};

export default config;
