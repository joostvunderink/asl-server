// Turns an ISO3601 string into a date object.
function t(text) {
  return new Date(text);
}

const data = [
  {
    table: 'country',
    rows: [
      { id: 1, code: 'nl', name: 'The Netherlands'},
      { id: 2, code: 'pl', name: 'Poland'},
      { id: 3, code: 'se', name: 'Sweden'},
      { id: 4242, code: 'ut', name: 'Country for update tests' },
    ]
  },
  {
    table: 'sport',
    rows: [
      { id: 1, description: 'Football, not soccer', name: 'football' },
      { id: 2, description: 'Basketball', name: 'basketball' },
      { id: 3, description: 'Ski Jumping', name: 'ski jumping' },
      { id: 4242, description: 'Some description', name: 'Sport for update tests' },
    ]
  },
  {
    table: 'region',
    rows: [
        { id: 1, country_id: 1, sport_id: 1, name: 'West 1', description: 'North-West part of NL for football' },
        { id: 2, country_id: 1, sport_id: 1, name: 'West 2', description: 'South-West part of NL for football' },
        { id: 3, country_id: 1, sport_id: 2, name: 'East', description: 'East part of NL for basketball' },
        { id: 4, country_id: 2, sport_id: 1, name: 'NW', description: 'North-West part of BE for football' },
        { id: 4242, country_id: 2, sport_id: 2, name: 'Region for update tests', description: 'Some description' },
    ]
  },
  {
    table: 'club',
    rows: [
        { id:  1, country_id: 1, name: 'SDZ',                  city: 'Amsterdam' },
        { id:  2, country_id: 1, name: 'Ilpendam',             city: 'Ilpendam'  },
        { id:  3, country_id: 1, name: 'Purmerend FC',         city: 'Purmerend' },
        { id:  4, country_id: 1, name: 'IVV',                  city: 'Landsmeer' },
        { id:  5, country_id: 1, name: 'Nieuw-West United SV', city: 'Amsterdam' },
        { id:  6, country_id: 1, name: 'Zaandijk',             city: 'Zaandijk'  },
        { id:  7, country_id: 1, name: 'Swift',                city: 'Amsterdam' },
        { id:  8, country_id: 1, name: 'Germaan/De Eland ASC', city: 'Amsterdam' },
        { id:  9, country_id: 1, name: 'Wherevogels De',       city: 'Purmerend' },
        { id: 10, country_id: 1, name: 'Buitenveldert SC',     city: 'Amsterdam' },
        { id: 11, country_id: 1, name: 'RCZ',                  city: 'Zaandam'   },
        { id: 12, country_id: 1, name: 'Meteoor De',           city: 'Amsterdam' },
        { id: 13, country_id: 1, name: 'dvc Buiksloot',        city: 'Amsterdam' },
        { id: 14, country_id: 1, name: 'DRC',                  city: 'Amsterdam' },
    ]
  },
  {
    table: 'season',
    rows: [
        { id: 1, region_id: 1, name: '2016-2017',
                 start_year: 2016, end_year: 2017, start_date: '2016-09-01', end_date: '2017-06-30' },
        { id: 2, region_id: 2, name: '2016-2017',
                 start_year: 2016, end_year: 2017, start_date: '2016-09-01', end_date: '2017-06-30' },
    ]
  },
  {
    table: 'competition_template',
    rows: [
        { id: 1, region_id: 1, name: '4E', description: '', play_day: 0 },
        { id: 2, region_id: 2, name: '4E', description: '', play_day: 0 },
    ]
  },
  {
    table: 'competition',
    rows: [
        { id: 1, competition_template_id: 1, season_id: 1 },
        { id: 2, competition_template_id: 1, season_id: 2 },
    ]
  },
  {
    table: 'competition_team',
    rows: [
        { id:  1, competition_id: 2, club_id:  1, name: 'SDZ' },
        { id:  2, competition_id: 2, club_id:  2, name: 'Ilpendam' },
        { id:  3, competition_id: 2, club_id:  3, name: 'Purmerend FC' },
        { id:  4, competition_id: 2, club_id:  4, name: 'IVV' },
        { id:  5, competition_id: 2, club_id:  5, name: 'Nieuw-West United SV' },
        { id:  6, competition_id: 2, club_id:  6, name: 'Zaandijk' },
        { id:  7, competition_id: 2, club_id:  7, name: 'Swift' },
        { id:  8, competition_id: 2, club_id:  8, name: 'Germaan/De Eland ASC' },
        { id:  9, competition_id: 2, club_id:  9, name: 'Wherevogels De' },
        { id: 10, competition_id: 2, club_id: 10, name: 'Buitenveldert SC' },
        { id: 11, competition_id: 2, club_id: 11, name: 'RCZ' },
        { id: 12, competition_id: 2, club_id: 12, name: 'Meteoor De' },
        { id: 13, competition_id: 2, club_id: 13, name: 'dvc Buiksloot' },
        { id: 14, competition_id: 2, club_id: 14, name: 'DRC' },
        { id: 15, competition_id: 1, club_id:  1, name: 'SDZ B-team' },
    ]
  },
  {
    table: 'competition_round',
    rows: [
        { id: 1, competition_id: 2, round: 1, round_date: '2016-09-04' },
        { id: 2, competition_id: 2, round: 2, round_date: '2016-09-11' },
        { id: 3, competition_id: 2, round: 3, round_date: '2016-09-18' },
        { id: 4, competition_id: 2, round: 4, round_date: '2016-09-25' },
    ]
  },
  {
    table: 'competition_match',
    rows: [
        { id:  1, competition_id: 2, competition_round_id: 1, start_time: t('2016-09-04T12:30:00Z'),
          home_team_id: 10, away_team_id:  8, home_team_score: 2, away_team_score: 6 },
        { id:  2, competition_id: 2, competition_round_id: 1, start_time: t('2016-09-04T12:30:00Z'),
          home_team_id: 14, away_team_id:  9, home_team_score: 2, away_team_score: 2 },
        { id:  3, competition_id: 2, competition_round_id: 1, start_time: t('2016-09-04T12:30:00Z'),
          home_team_id:  2, away_team_id:  1, home_team_score: 3, away_team_score: 2 },
        { id:  4, competition_id: 2, competition_round_id: 1, start_time: t('2016-09-04T12:30:00Z'),
          home_team_id:  5, away_team_id:  4, home_team_score: 0, away_team_score: 4 },
        { id:  5, competition_id: 2, competition_round_id: 1, start_time: t('2016-09-04T12:30:00Z'),
          home_team_id:  3, away_team_id:  7, home_team_score: 4, away_team_score: 1 },
        { id:  6, competition_id: 2, competition_round_id: 1, start_time: t('2016-09-04T12:30:00Z'),
          home_team_id: 11, away_team_id: 12, home_team_score: 0, away_team_score: 2 },
        { id:  7, competition_id: 2, competition_round_id: 1, start_time: t('2016-09-04T12:30:00Z'),
          home_team_id:  6, away_team_id: 13, home_team_score: 8, away_team_score: 0 },

        { id:  8, competition_id: 2, competition_round_id: 2, start_time: t('2016-09-11T12:30:00Z'),
          home_team_id: 14, away_team_id:  8, home_team_score: 1, away_team_score: 1 },
        { id:  9, competition_id: 2, competition_round_id: 2, start_time: t('2016-09-11T12:30:00Z'),
          home_team_id:  2, away_team_id:  9, home_team_score: 2, away_team_score: 2 },
        { id: 10, competition_id: 2, competition_round_id: 2, start_time: t('2016-09-11T12:30:00Z'),
          home_team_id:  5, away_team_id:  1, home_team_score: 3, away_team_score: 2 },
        { id: 11, competition_id: 2, competition_round_id: 2, start_time: t('2016-09-11T12:30:00Z'),
          home_team_id:  3, away_team_id:  4, home_team_score: 5, away_team_score: 4 },
        { id: 12, competition_id: 2, competition_round_id: 2, start_time: t('2016-09-11T12:30:00Z'),
          home_team_id: 11, away_team_id:  7, home_team_score: 2, away_team_score: 1 },
        { id: 13, competition_id: 2, competition_round_id: 2, start_time: t('2016-09-11T12:30:00Z'),
          home_team_id: 12, away_team_id:  6, home_team_score: 1, away_team_score: 2 },
        { id: 14, competition_id: 2, competition_round_id: 2, start_time: t('2016-09-11T12:30:00Z'),
          home_team_id: 13, away_team_id: 10, home_team_score: 5, away_team_score: 3 },
    ]
  },
  {
    table: 'person',
    rows: [
        { id: 1, full_name: 'Marco van Basten', first_name: 'Marco', last_name: 'van Basten',  },
        { id: 2, full_name: 'Ruud Gullit', first_name: 'Ruud', last_name: 'Gullit',  },
    ]
  },
  {
    table: 'user',
    rows: [
        { id: 1, uuid: '4dc21c5d-cb16-4941-8d98-d35408d11856', email: 'tom@asl',      password: '$2a$10$/bVQvHdrL4Qx0FR8fxjc7uLFmdYNZEg.L9ebiS6/TOagIi88T9W7e' },
        { id: 2, uuid: '4896153c-d947-4978-a299-5fa8a454df06', email: 'joost@asl',    password: '$2a$10$OdSai7uiNEPvGGcJxZcAMueVrpfPyHlznmNgRa8qMxgYf3fNn8sq2' },
        { id: 3, uuid: 'e8118253-f494-40e5-92ad-23ee96d60cdc', email: 'john@doe.com', password: '$2a$10$ivqqQJNDY2lhzjzSnf5HxugWA3D7Dq9n1rYICyNN7oazQq7M5MMq.' },
    ]
  },
  {
    table: 'oauth_token',
    rows: [
      { access_token: '78454744c8b846b4021ca935735d162e7ebada1a',
        access_token_expires_on: t(((new Date()).getFullYear() + 1 ) + '-01-01T00:00:00Z'),
        client_id: 'asl-crm', user_uuid: '4dc21c5d-cb16-4941-8d98-d35408d11856' }
    ]
  },
  {
    table: 'role',
    rows: [
      { id: 1, name: 'admin' },
      { id: 2, name: 'user' },
    ]
  },
  {
    table: 'user_role',
    rows: [
      { id: 1, user_id: 1, role_id: 1 },
      { id: 2, user_id: 2, role_id: 1 },
      { id: 3, user_id: 3, role_id: 2 },
      { id: 4, user_id: 1, role_id: 2 },
    ]
  },
  {
    table: 'permission',
    rows: [
      { id: 1, role_id: 1, model: 'country', operation: 'create' },
      { id: 2, role_id: 1, model: 'country', operation: 'read' },
      { id: 3, role_id: 1, model: 'country', operation: 'update' },
      { id: 4, role_id: 1, model: 'country', operation: 'delete' },
      { id: 5, role_id: 2, model: 'country', operation: 'read' },
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
