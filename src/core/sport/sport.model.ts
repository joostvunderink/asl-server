import { knex, bookshelf } from '../../db';

var Sport = bookshelf.Model.extend({
  tableName: 'sport'
});

export default Sport;
