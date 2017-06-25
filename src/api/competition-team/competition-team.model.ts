import { knex, bookshelf, defaultTableDef } from '../../db';
import * as _ from 'lodash';

var CompetitionTeam = bookshelf.model('CompetitionTeam', _.merge(defaultTableDef, {
  tableName: 'competition_team'
}));

export default CompetitionTeam;
