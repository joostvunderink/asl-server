import { aslModel } from '../../db';

// require('../team/team.model');

let Club = aslModel('Club', 'club', {
  teams: function() {
    return this.hasMany('Team');
  }
});

export default Club;
