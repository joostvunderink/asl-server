exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('role', function (table) {
    table.increments();
    table.string('name').unique().notNull();

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  })
  .then(() => {
    return knex.schema.createTableIfNotExists('permission', function (table) {
      table.increments();
      table.integer('role_id').unsigned().references('id').inTable('role').notNull();
      table.string('model').notNull();
      // table.srring('operation').notNull();
      table.enum('operation', ['create', 'read', 'update', 'delete']).notNull();

      table.string('created_by');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.timestamp('deleted_at').nullable();
    });
  })
  .then(() => {
    return knex.schema.createTableIfNotExists('user_role', function (table) {
      table.increments();
      table.integer('user_id').unsigned().references('id').inTable('user').notNull();
      table.integer('role_id').unsigned().references('id').inTable('role').notNull();

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
    knex.schema.dropTable('permission'),
    knex.schema.dropTable('role'),
  ]);
};
