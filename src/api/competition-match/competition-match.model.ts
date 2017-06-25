import { knex, bookshelf } from '../../db';

var CompetitionMatch = bookshelf.Model.extend({
  tableName: 'competition_match'
});

export default CompetitionMatch;
