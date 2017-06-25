import { knex, bookshelf } from '../../db';

var Sport = bookshelf.model('Sport', {
  tableName: 'sport'
});

export default Sport;
