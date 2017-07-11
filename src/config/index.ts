function requiredEnvVar(name) {
  if (!process.env[name]) {
    throw new Error('Missing required env var ' + name);
  }
  return process.env[name];
}

export const config = {
  db: {
    client: 'mysql',
    connection: {
      debug    : requiredEnvVar('ASL_DB_DEBUG'),
      host     : requiredEnvVar('ASL_DB_HOST'),
      user     : requiredEnvVar('ASL_DB_USER'),
      password : requiredEnvVar('ASL_DB_PASSWORD'),
      database : requiredEnvVar('ASL_DB_NAME'),
      port     : process.env.ASL_DB_PORT || 3306,
      charset  : process.env.ASL_DB_CHARSET || 'utf8',
    },
  }
};
