import { aslModel } from '../../db';
import logger from '../../logger';

var CompetitionMatch = aslModel('CompetitionMatch', 'competition_match', {
  initialize: function() {
    this.on('updated', (model, attrs, options) => {
      process.emit('model.competition_match.updated', { model: model });
    });
  }
});

export default CompetitionMatch;
