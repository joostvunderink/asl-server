const data = [
  {
    table: 'country',
    rows: [
      { id: 1, code: 'nl', name: 'The Netherlands'},
    ]
  },
  {
    table: 'sport',
    rows: [
      { id: 1, description: 'Football, not soccer', name: 'football' }
    ]
  },
  {
    table: 'region',
    rows: [
        { id: 1, country_id: 1, sport_id: 1, name: 'West 1', description: 'North-West part of NL' },
        { id: 2, country_id: 1, sport_id: 1, name: 'West 2', description: 'South-West part of NL' },
    ]
  },
];

exports.seed = function(knex, Promise) {
  return data.reverse().reduce((prev, cur) => {
    return prev.then(() => {
      return knex(cur.table).del();
    });
  }, Promise.resolve())
  .then(() => {
    return data.reverse().reduce((prev, cur) => {
      return prev.then(() => {
        const promises = cur.rows.map(row => {
          return knex(cur.table).insert(row);
        });
        return Promise.all(promises);
      });
    }, Promise.resolve());
  });
};
