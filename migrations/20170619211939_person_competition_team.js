exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('person_competition_team', function (table) {
    table.increments();

    table.integer('competition_team_id').unsigned().references('id').inTable('competition_team').notNull();
    table.integer('person_id').unsigned().references('id').inTable('person').notNull();
    table.integer('person_role_id').unsigned().references('id').inTable('person_role').notNull();

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('person_competition_team');
};
