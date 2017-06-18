exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('competition', function (table) {
    table.increments();
    table.string('name');
    table.string('description');
    table.integer('play_day'); // Sunday 0, Monday 1, ..., Saturday 6

    table.integer('region_id').unsigned().references('id').inTable('region');
    table.integer('season_id').unsigned().references('id').inTable('region');
    
    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('competition');
};
