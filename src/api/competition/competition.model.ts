import { knex, bookshelf } from '../../db';

var Competition = bookshelf.Model.extend({
  tableName: 'competition'
});

export default Competition;
