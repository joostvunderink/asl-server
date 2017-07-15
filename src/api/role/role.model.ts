import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

require('../team/team.model');
var Role = bookshelf.model('Role', _.merge(defaultTableDef, {
  tableName: 'role',
}));

export default Role;
