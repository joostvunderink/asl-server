exports.seed = function(knex, Promise) {
  return knex('sport').del()
    .then(() => {
      return Promise.all([
        knex('sport').insert({id: 1, description: 'Football, not soccer', name: 'football'}),
      ]);
    });
};
