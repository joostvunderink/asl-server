const config = {
  db: {
    client: 'mysql',
    connection: {
      host     : process.env.ASL_DB_HOST,
      user     : process.env.ASL_DB_USER,
      password : process.env.ASL_DB_PASSWORD,
      database : process.env.ASL_DB_NAME,
      charset  : 'utf8'
    }
  }
};

export default config;