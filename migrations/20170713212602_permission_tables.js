exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('role', function (table) {
    table.increments();
    table.string('name').unique();

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  })
  .then(() => {
    return knex.schema.createTableIfNotExists('role_operation', function (table) {
      table.increments();
      table.integer('role_id').unsigned().references('id').inTable('role');
      table.string('model');
      table.string('operation');

      table.string('created_by');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  })
  .then(() => {
    return knex.schema.createTableIfNotExists('user_role', function (table) {
      table.increments();
      table.integer('user_id').unsigned().references('id').inTable('user');
      table.integer('role_id').unsigned().references('id').inTable('role');

      table.string('created_by');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  });
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('user_role'),
    knex.schema.dropTable('role_operation'),
    knex.schema.dropTable('role'),
  ]);
};
