import { knex, bookshelf } from '../../db';

require('../team/team.model');
var Club = bookshelf.model('Club', {
  tableName: 'club',
  teams: function() {
    return this.hasMany('Team');
  }
});

export default Club;
