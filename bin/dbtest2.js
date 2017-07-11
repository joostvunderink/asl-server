var config = require('../dist/config/index');
console.log('----------')
console.log(config.default.db)
console.log('----------')
var dbConfig = config.default.db;
var knex = require('knex')(dbConfig);
knex.schema.raw('select VERSION() as v').then(ver => { console.log('version:'); console.log(ver[0]); knex.destroy() });
