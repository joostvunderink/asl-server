const { config } = require('./dist/config');
const knexConf = config.db;

const { unittestConfig } = require('./dist/config/config.unittest');
const unittestKnexConf = unittestConfig.db;

module.exports = {
  development: knexConf,
  test       : knexConf,
  qa         : knexConf,
  production : knexConf,
  unittest   : unittestKnexConf
};
