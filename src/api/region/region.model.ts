import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

require('../country/country.model');
require('../sport/sport.model');

var Region = bookshelf.model('Region', _.merge(defaultTableDef, {
  tableName: 'region',
  country: function() {
    return this.belongsTo('Country');
  },
  sport: function() {
    return this.belongsTo('Sport');
  }
}));

export default Region;
