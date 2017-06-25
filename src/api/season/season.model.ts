import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

var Season = bookshelf.model('Season', _.merge(defaultTableDef, {
  tableName: 'season'
}));

export default Season;
