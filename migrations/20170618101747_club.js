exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('club', function (table) {
    table.increments();
    table.string('name');
    table.string('type');
    table.string('description');
    table.string('park_name');
    table.string('address');
    table.string('postal_code');
    table.string('city');

    table.integer('country_id').unsigned().references('id').inTable('country').notNull();
    table.integer('sport_id').unsigned().references('id').inTable('sport').notNull();
    
    table.string('created_by');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('club');
};
