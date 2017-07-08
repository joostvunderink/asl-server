exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('user', function (table) {
    table.increments();
    table.string('uuid').unique();
    table.string('email').unique();
    table.string('password');

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  })
  .then(() => {
    return knex.schema.createTableIfNotExists('oauth_token', function (table) {
      table.string('access_token');
      table.timestamp('access_token_expires_on').defaultTo(knex.fn.now());
      table.string('client_id');
      table.string('refresh_token');
      table.timestamp('refresh_token_expires_on').defaultTo(knex.fn.now());
      table.string('user_uuid');
    });
  })
  .then(() => {
    return knex.schema.createTableIfNotExists('oauth_client', function (table) {
      table.string('client_id').unique();
      table.string('client_secret');
      table.string('redirect_url');
      table.string('grants');
    });
  });
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('user'),
    knex.schema.dropTable('oauth_client'),
    knex.schema.dropTable('oauth_token'),
  ]);
};
