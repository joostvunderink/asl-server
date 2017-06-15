exports.seed = function(knex, Promise) {
  return knex('country').del()
    .then(() => {
      return Promise.all([
        knex('country').insert({code: 'nl', name: 'The Netherlands'}),
      ]);
    });
};
