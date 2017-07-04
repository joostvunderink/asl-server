const config = {
  db: {
    client: 'mysql',
    connection: {
      host     : process.env.ASL_DB_HOST || 'asl-db',
      port     : 3306,
      user     : process.env.ASL_DB_USER || 'asl',
      password : process.env.ASL_DB_PASSWORD || 'asl',
      database : process.env.ASL_DB_NAME || 'asl',
      charset  : 'utf8'
    }
  }
};

export default config;