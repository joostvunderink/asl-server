import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

var Country = bookshelf.model('Country', _.merge(defaultTableDef, {
  tableName: 'country',
}));

export default Country;
