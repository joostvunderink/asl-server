import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

var CompetitionMatch = bookshelf.model('CompetitionMatch', _.merge(defaultTableDef, {
  tableName: 'competition_match'
}));

export default CompetitionMatch;
