import { aslModel } from '../../db';
import logger from '../../logger';

var Competition = aslModel('Competition', 'competition', {
  teams: function() {
    return this.hasMany('CompetitionTeam');
  },
  rounds: function() {
    return this.hasMany('CompetitionRound');
  },
  matches: function() {
    return this.hasMany('CompetitionMatch');
  },
  competitionTemplate: function() {
    return this.belongsTo('CompetitionTemplate');
  },
});

export default Competition;
