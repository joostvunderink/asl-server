import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

require('../team/team.model');
var User = bookshelf.model('User', _.merge(defaultTableDef, {
  tableName: 'user',
}));

export default User;
