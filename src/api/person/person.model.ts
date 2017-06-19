import { knex, bookshelf } from '../../db';

var Person = bookshelf.Model.extend({
  tableName: 'person'
});

export default Person;
