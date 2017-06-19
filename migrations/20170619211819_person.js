exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('person', function (table) {
    table.increments();
    table.string('full_name');
    table.string('first_name');
    table.string('last_name');

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('person');
};
