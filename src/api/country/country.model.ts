import { knex, bookshelf } from '../../db';

var Country = bookshelf.model('Country', {
  tableName: 'country'
});

export default Country;
