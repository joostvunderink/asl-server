exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('sport', function (table) {
    table.increments();
    table.string('name').unique();
    table.string('description');
    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('sport');
};
