const { config } = require('./dist/config');
const knexConf = config.db;
console.log('Knex database config: dbname=%s host=%s user=%s',
  knexConf.connection.database, knexConf.connection.host, knexConf.connection.user);

const { unittestConfig } = require('./dist/config/config.unittest');
const unittestKnexConf = unittestConfig.db;

module.exports = {
  development: knexConf,
  test       : knexConf,
  qa         : knexConf,
  production : knexConf,
  unittest   : unittestKnexConf
};
