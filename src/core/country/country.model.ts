import { knex, bookshelf } from '../../db';

var Country = bookshelf.Model.extend({
  tableName: 'country'
});

export default Country;
