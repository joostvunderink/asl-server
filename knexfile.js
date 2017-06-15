const config = require('./dist/config');
const knexConf = config.default.db;

const unittestConfig = require('./dist/config/config.unittest');
const unittestKnexConf = unittestConfig.default.db;

module.exports = {
  development: knexConf,
  staging    : knexConf,
  qa         : knexConf,
  release    : knexConf,
  demo       : knexConf,
  production : knexConf,
  prod       : knexConf,
  unittest   : unittestKnexConf
};
