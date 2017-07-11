export const unittestConfig = {
  db: {
    client: 'mysql',
    seeds: {
      directory: './seeds/unittest',
    },
    connection: {
      host     : process.env.ASL_UNITTEST_DB_HOST || '127.0.0.1',
      user     : process.env.ASL_UNITTEST_DB_USER || 'asl_ut',
      password : process.env.ASL_UNITTEST_DB_PASSWORD || 'asl_ut',
      database : process.env.ASL_UNITTEST_DB_NAME || 'asl_ut',
      charset  : 'utf8'
    }
  }
};
