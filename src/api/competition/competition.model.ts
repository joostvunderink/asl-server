import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

var Competition = bookshelf.model('Competition', _.merge(defaultTableDef, {
  tableName: 'competition'
}));

export default Competition;
