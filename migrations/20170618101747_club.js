exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('club', function (table) {
    table.increments();
    table.string('name');
    table.string('description');
    table.string('city');

    table.integer('country_id').unsigned().references('id').inTable('country');
    table.integer('sport_id').unsigned().references('id').inTable('sport');
    
    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('club');
};
