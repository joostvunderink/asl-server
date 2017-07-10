import configDev from './config.development';
import configUnittest from './config.unittest';
import configTest from './config.test';
import configProduction from './config.production';

console.log('Loading configuration. NODE_ENV is %s', process.env.NODE_ENV);

const configs = {
  development: configDev,
  unittest   : configUnittest,
  production : configProduction,
  test       : configTest,
};

const env = process.env.NODE_ENV || 'development';
const config = configs[env];

console.log('Config for env %s', env);
console.log(JSON.stringify(config));

export default config;
