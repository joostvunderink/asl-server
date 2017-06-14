const config = {
  db: {
    client: 'mysql',
    connection: {
      host     : process.env.ASL_DB_HOST || '127.0.0.1',
      user     : process.env.ASL_DB_USER || 'asl',
      password : process.env.ASL_DB_PASSWORD || 'asl',
      database : process.env.ASL_DB_NAME || 'asl',
      charset  : 'utf8'
    }
  }
};

export default config;