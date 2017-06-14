const config = require('./dist/config');
const knexConf = config.default.db;

module.exports = {
  development: knexConf,
  staging: knexConf,
  // test: testKnexConf,
  qa: knexConf,
  release: knexConf,
  production: knexConf,
  prod: knexConf,
  demo: knexConf
};
