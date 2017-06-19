import { knex, bookshelf } from '../../db';

var CompetitionTemplate = bookshelf.Model.extend({
  tableName: 'competition_template'
});

export default CompetitionTemplate;
