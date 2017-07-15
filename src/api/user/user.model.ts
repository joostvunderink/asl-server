import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

require('../role/role.model');
require('../user-role/user-role.model');

var User = bookshelf.model('User', _.merge(defaultTableDef, {
  tableName: 'user',
  roles: function() {
    return this.belongsToMany('Role', 'user_role');
  },
}));

export default User;
