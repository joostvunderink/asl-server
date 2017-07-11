function requiredEnvVar(name) {
  if (!process.env[name]) {
    throw new Error('Missing required env var ' + name);
  }
  return process.env[name];
}

let _config = {
  db: {
    client: 'mysql',
    seeds: {
      directory: './seeds/dev',
    },
    connection: {
      debug    : process.env.ASL_DB_DEBUG,
      host     : requiredEnvVar('ASL_DB_HOST'),
      user     : requiredEnvVar('ASL_DB_USER'),
      password : requiredEnvVar('ASL_DB_PASSWORD'),
      database : requiredEnvVar('ASL_DB_NAME'),
      port     : process.env.ASL_DB_PORT || 3306,
      charset  : process.env.ASL_DB_CHARSET || 'utf8',
    },
  }
};

let _configUnittest = {
  db: {
    client: 'mysql',
    seeds: {
      directory: './seeds/unittest',
    },
    connection: {
      debug    : process.env.ASL_UNITTEST_DB_DEBUG,
      host     : process.env.ASL_UNITTEST_DB_HOST || '127.0.0.1',
      user     : process.env.ASL_UNITTEST_DB_USER || 'asl_ut',
      password : process.env.ASL_UNITTEST_DB_PASSWORD || 'asl_ut',
      database : process.env.ASL_UNITTEST_DB_NAME || 'asl_ut',
      port     : process.env.ASL_UNITTEST_DB_PORT || 3306,
      charset  : process.env.ASL_UNITTEST_DB_CHARSET || 'utf8',
    }
  }
};

export const config = process.env.NODE_ENV === 'unittest' ? _configUnittest : _config;
