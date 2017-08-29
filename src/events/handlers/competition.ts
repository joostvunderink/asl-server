import logger from '../../logger';
import Competition from '../../api/competition/competition.model';
import CompetitionController from '../../api/competition/competition.controller';

function recalculateCompetition(args) {
  let competitionMatch = args.model;
  logger.info({ competition_id: competitionMatch.get('competition_id'), },
      'events handler: competition_match updated; setting competition needs_recalculate true');

  CompetitionController.calculateStandings({ competitionId: competitionMatch.get('competition_id') })
  .then(res => {
    logger.info({ competition_id: competitionMatch.get('competition_id')}, 'Competition recalculated.')
  });
}

export const eventHandlers = [
  {
    description: 'Recalculate a competition when a competition match is updated',
    event: 'model.competition_match.updated',
    handler: recalculateCompetition,
  },
];
