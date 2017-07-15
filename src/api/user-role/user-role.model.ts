import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

require('../role/role.model');
require('../user/user.model');

var UserRole = bookshelf.model('UserRole', _.merge(defaultTableDef, {
  tableName: 'user_role',
  // roles: function() {
  //   return this.hasMany('Role');
  // },
  // users: function() {
  //   return this.hasMany('User');
  // },

}));

export default UserRole;
