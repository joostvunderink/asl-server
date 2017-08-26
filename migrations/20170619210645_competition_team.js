exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('competition_team', function (table) {
    table.increments();

    table.string('name');
    table.integer('competition_id').unsigned().references('id').inTable('competition');
    table.integer('club_id').unsigned().references('id').inTable('club');

    // Current standings fields
    table.integer('num_matches_played').unsigned().defaultTo(0);
    table.integer('num_matches_win').unsigned().defaultTo(0);
    table.integer('num_matches_loss').unsigned().defaultTo(0);
    table.integer('num_matches_draw').unsigned().defaultTo(0);
    table.integer('points').unsigned().defaultTo(0);
    table.integer('rank').unsigned().defaultTo(1);
    table.integer('goals_scored').unsigned().defaultTo(0);
    table.integer('goals_received').unsigned().defaultTo(0);

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('competition_team');
};
