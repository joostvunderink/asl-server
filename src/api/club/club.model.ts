import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

require('../team/team.model');
var Club = bookshelf.model('Club', _.merge(defaultTableDef, {
  tableName: 'club',
  teams: function() {
    return this.hasMany('Team');
  }
}));

export default Club;
