import { aslModel } from '../../db';

// require('../role/role.model');
// require('../user-role/user-role.model');

let User = aslModel('User', 'user', {
  roles: function() {
    return this.belongsToMany('Role', 'user_role');
  },
});

export default User;
