import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

var Person = bookshelf.model('Person', _.merge(defaultTableDef, {
  tableName: 'person'
}));

export default Person;
