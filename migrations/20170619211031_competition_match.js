exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('competition_match', function (table) {
    table.increments();

    table.integer('competition_id').unsigned().references('id').inTable('competition').notNull();
    table.integer('competition_round_id').unsigned().references('id').inTable('competition_round').notNull();
    table.integer('home_team_id').unsigned().references('id').inTable('competition_team').notNull();
    table.integer('away_team_id').unsigned().references('id').inTable('competition_team').notNull();
    table.integer('home_team_score').unsigned;
    table.integer('away_team_score').unsigned;
    table.timestamp('start_time').nullable();
    table.timestamp('original_start_time').nullable();
    table.enum('status', ['pending', 'active', 'completed']).defaultTo('pending');

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('competition_match');
};
