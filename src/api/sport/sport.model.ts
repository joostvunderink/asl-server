import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

var Sport = bookshelf.model('Sport', _.merge(defaultTableDef, {
  tableName: 'sport'
}));

export default Sport;
