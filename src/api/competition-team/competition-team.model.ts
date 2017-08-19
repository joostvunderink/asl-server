import { aslModel } from '../../db';

var CompetitionTeam = aslModel('CompetitionTeam', 'competition_team', {
  competition: function() {
    return this.belongsTo('Competition');
  },
  club: function() {
    return this.belongsTo('Club');
  },
});

export default CompetitionTeam;
