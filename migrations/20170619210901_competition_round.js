exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('competition_round', function (table) {
    table.increments();

    table.integer('competition_id').unsigned().references('id').inTable('competition');
    table.integer('round').unsigned();

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('competition_round');
};
