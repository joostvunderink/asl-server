import { aslModel } from '../../db';

let Club = aslModel('Club', 'club', {
  teams: function() {
    return this.hasMany('CompetitionTeam');
  }
});

export default Club;
