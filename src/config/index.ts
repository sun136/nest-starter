import dev from './app-dev';
import prod from './app-prod';
import test from './app-test';

const configMapping = {
  development: dev,
  test: test,
  production: prod,
};

export const Env = (process.env.NODE_ENV as 'development' | 'test' | 'production') || 'development';

const AppConfig = configMapping[Env];

export default AppConfig;

export const isDevEnv = Env === 'development';
export const isTestEnv = Env === 'test';
export const isProdEnv = Env === 'production';
