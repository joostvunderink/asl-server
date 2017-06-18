const data = [
  {
    table: 'country',
    rows: [
      { id: 1, code: 'nl', name: 'The Netherlands'},
      { id: 2, code: 'pl', name: 'Poland'},
    ]
  },
  {
    table: 'sport',
    rows: [
      { id: 1, description: 'Football, not soccer', name: 'football' },
      { id: 2, description: 'Basketball', name: 'basketball' },
    ]
  },
  {
    table: 'region',
    rows: [
        { id: 1, country_id: 1, sport_id: 1, name: 'West 1', description: 'North-West part of NL for football' },
        { id: 2, country_id: 1, sport_id: 1, name: 'West 2', description: 'South-West part of NL for football' },
        { id: 3, country_id: 1, sport_id: 2, name: 'East', description: 'East part of NL for basketball' },
        { id: 4, country_id: 2, sport_id: 1, name: 'NW', description: 'North-West part of BE for football' },
    ]
  },
  {
    table: 'club',
    rows: [
        { id: 1, region_id: 1, name: 'Ajax', city: 'Amsterdam' },
        { id: 2, region_id: 2, name: 'Feyenoord', city: 'Rotterdam' },
        { id: 3, region_id: 2, name: 'Westlandia', city: 'Naaldwijk' },
    ]
  },
  {
    table: 'season',
    rows: [
        { id: 1, region_id: 1, name: '2016-2017', description: '',
                 start_year: 2016, end_year: 2017, start_date: '2016-09-01', end_date: '2017-06-30' },
        { id: 2, region_id: 2, name: '2016-2017', description: '',
                 start_year: 2016, end_year: 2017, start_date: '2016-09-01', end_date: '2017-06-30' },
    ]
  },
  {
    table: 'competition',
    rows: [
        { id: 1, region_id: 1, season_id: 1, name: '4E', description: '', play_day: 6 },
        { id: 2, region_id: 2, season_id: 2, name: '4E', description: '', play_day: 6 },
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
