var knex = require('knex')({
  client:'mysql',
  connection: {
    host     : process.env.ASL_DB_HOST || 'asl-db',
    port     : process.env.ASL_DB_PORT || 3306,
    user     : process.env.ASL_DB_USER || 'asl',
    password : process.env.ASL_DB_PASSWORD || 'asl',
    database : process.env.ASL_DB_NAME || 'asl',
    charset:'utf8'
  }
});
knex.schema.raw('select VERSION() as v').then(ver => { console.log('version:'); console.log(ver[0]); knex.destroy() });
