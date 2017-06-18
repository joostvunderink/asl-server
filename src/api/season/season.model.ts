import { knex, bookshelf } from '../../db';

var Season = bookshelf.Model.extend({
  tableName: 'season'
});

export default Season;
