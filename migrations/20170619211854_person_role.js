exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('person_role', function (table) {
    table.increments();
    table.string('name');

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('person_role');
};
