exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('season', function (table) {
    table.increments();
    table.string('name');
    table.string('description');
    table.integer('start_year');
    table.integer('end_year');
    table.date('start_date');
    table.date('end_date');

    table.integer('region_id').unsigned().references('id').inTable('region').notNull();
    
    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('season');
};
