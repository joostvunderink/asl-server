import { knex, bookshelf } from '../../db';

var Team = bookshelf.Model.extend({
  tableName: 'team'
});

export default Team;
