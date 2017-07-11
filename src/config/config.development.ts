let config = {
  db: {
    client: 'mysql',
    debug: process.env.ASL_DB_DEBUG,
    connection: {
      host     : process.env.ASL_DB_HOST || 'asl-db',
      port     : process.env.ASL_DB_PORT || 3306,
      user     : process.env.ASL_DB_USER || 'asl',
      password : process.env.ASL_DB_PASSWORD || 'asl',
      database : process.env.ASL_DB_NAME || 'asl',
      charset  : process.env.ASL_DB_CHARSET || 'utf8',
    },
  }
};
// config = {"db":{"client":"mysql","connection":{"host":"eu-cdbr-west-01.cleardb.com","port":3306,"user":"b573f341986a5b","password":"6c99c34d","database":"heroku_8367dca6932f169","charset":"utf8"}}};
// config = {"db":{"client":"mysql","connection":{"host":"wyqk6x041tfxg39e.chr7pe7iynqr.eu-west-1.rds.amazonaws.com","port":3306,"user":"mxogfzzmjdc51ds1","password":"peoiugbpo041ncq0","database":"di1wglxm9ngblkzy","charset":"utf8"}}};
export default config;