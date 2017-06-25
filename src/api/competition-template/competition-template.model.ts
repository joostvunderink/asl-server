import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

var CompetitionTemplate = bookshelf.model('CompetitionTemplate', _.merge(defaultTableDef, {
  tableName: 'competition_template'
}));

export default CompetitionTemplate;
