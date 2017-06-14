import configDev from './config.development';
import configUnittest from './config.unittest';

const configs = {
  development: configDev,
  unittest: configUnittest
};

const env = process.env.NODE_ENV || 'development';
const config = configs[env];

export default config;
