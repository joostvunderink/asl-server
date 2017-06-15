exports.seed = function(knex, Promise) {
  return knex('country').del()
    .then(() => {
      return Promise.all([
        knex('country').insert({id: 1, code: 'nl', name: 'The Netherlands'}),
      ]);
    });
};
