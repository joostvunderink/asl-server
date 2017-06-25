import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

require('../club/club.model');
var Team = bookshelf.model('Team', _.merge(defaultTableDef, {
  tableName: 'team',
  club: function() {
    return this.belongsTo('Club');
  }
}));

export default Team;
