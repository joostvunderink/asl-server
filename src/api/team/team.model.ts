import { knex, bookshelf } from '../../db';

require('../club/club.model');
var Team = bookshelf.model('Team', {
  tableName: 'team',
  club: function() {
    return this.belongsTo('Club');
  }
});

export default Team;
