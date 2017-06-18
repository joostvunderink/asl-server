import { knex, bookshelf } from '../../db';

var Club = bookshelf.Model.extend({
  tableName: 'club'
});

export default Club;
