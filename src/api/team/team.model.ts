import { aslModel } from '../../db';

// require('../club/club.model');

let Team = aslModel('Team', 'team', {
  club: function() {
    return this.belongsTo('Club');
  }
});

export default Team;
