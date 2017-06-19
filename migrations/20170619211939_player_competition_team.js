exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('player_competition_team', function (table) {
    table.increments();

    table.integer('competition_team_id').unsigned().references('id').inTable('competition_team');
    table.integer('player_id').unsigned().references('id').inTable('player');
    table.integer('player_role_id').unsigned().references('id').inTable('player_role');

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('player_competition_team');
};
