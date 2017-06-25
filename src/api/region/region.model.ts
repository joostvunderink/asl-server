import { knex, bookshelf } from '../../db';

require('../country/country.model');
require('../sport/sport.model');

var Region = bookshelf.model('Region', {
  tableName: 'region',
  country: function() {
    return this.belongsTo('Country');
  },
  sport: function() {
    return this.belongsTo('Sport');
  }
});

export default Region;
