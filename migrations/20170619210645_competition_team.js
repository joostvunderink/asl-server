exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('competition_team', function (table) {
    table.increments();

    table.string('name');
    table.integer('competition_id').unsigned().references('id').inTable('competition');
    table.integer('club_id').unsigned().references('id').inTable('club');

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('competition_team');
};
