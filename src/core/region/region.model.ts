import { knex, bookshelf } from '../../db';

var Region = bookshelf.Model.extend({
  tableName: 'region'
});

export default Region;
