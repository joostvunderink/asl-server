import { knex, bookshelf } from '../../db';

var CompetitionTeam = bookshelf.Model.extend({
  tableName: 'competition_team'
});

export default CompetitionTeam;
