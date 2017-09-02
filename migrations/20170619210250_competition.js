exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('competition', function (table) {
    table.increments();

    table.integer('competition_template_id').unsigned().references('id').inTable('competition_template').notNull();
    table.integer('season_id').unsigned().references('id').inTable('season').notNull();

    table.enum('status', ['pending', 'active', 'completed']).defaultTo('pending');

    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('competition');
};
