import { knex, bookshelf } from '../../db';

var CompetitionRound = bookshelf.Model.extend({
  tableName: 'competition_round'
});

export default CompetitionRound;
