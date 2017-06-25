import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

var CompetitionRound = bookshelf.model('CompetitionRound', _.merge(defaultTableDef, {
  tableName: 'competition_round'
}));

export default CompetitionRound;
