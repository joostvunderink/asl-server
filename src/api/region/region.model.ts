import { aslModel } from '../../db';

// require('../country/country.model');
// require('../sport/sport.model');

let Region = aslModel('Region', 'region', {
  country: function() {
    return this.belongsTo('Country');
  },
  sport: function() {
    return this.belongsTo('Sport');
  }
});

export default Region;
