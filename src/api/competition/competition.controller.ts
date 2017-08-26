import Competition from './competition.model';
import CompetitionTeam from '../competition-team/competition-team.model';
import BaseController from '../../core/base.controller';
import logger from '../../logger';

export class CompetitionController extends BaseController {
  constructor() {
    super();
    this.model = Competition;
  }

  calculateStandings(args: any) {
    const { competitionId } = args;
    logger.info({ competition_id: competitionId }, 'calculateStandings 2');

    return Competition
    .where('id', competitionId)
    .fetch({ withRelated: ['teams', 'rounds', 'matches', 'competitionTemplate'] })
    .then(competition => {
      const teams = competition.related('teams').toJSON();
      const rounds = competition.related('rounds').toJSON();
      const matches = competition.related('matches').toJSON();

      // logger.info({ teams }, 'the teams');

      let matchResults = {};
      teams.forEach(team => {
        matchResults[team.id] = {
          num_matches_played: 0,
          num_matches_win   : 0,
          num_matches_loss  : 0,
          num_matches_draw  : 0,
          goals_scored      : 0,
          goals_received    : 0,
        };
      });

      matches.forEach(match => {
        // logger.info({ match }, 'le match');
        if (match.home_team_score > match.away_team_score) {
          matchResults[match.home_team_id].num_matches_win += 1;
          matchResults[match.away_team_id].num_matches_loss += 1;
        } else if (match.home_team_score < match.away_team_score) {
          matchResults[match.home_team_id].num_matches_loss += 1;
          matchResults[match.away_team_id].num_matches_win += 1;
        } else {
          matchResults[match.home_team_id].num_matches_draw += 1;
          matchResults[match.away_team_id].num_matches_draw += 1;
        }
        
        matchResults[match.home_team_id].num_matches_played += 1;
        matchResults[match.home_team_id].goals_scored += match.home_team_score;
        matchResults[match.home_team_id].goals_received += match.away_team_score;

        matchResults[match.away_team_id].num_matches_played += 1;
        matchResults[match.away_team_id].goals_scored += match.away_team_score;
        matchResults[match.away_team_id].goals_received += match.home_team_score;

        const away_team_win = match.home_team_score > match.away_team_score;
      });

      // logger.info({ matchResults }, 'results');

      let promises = Object.keys(matchResults).map(teamId => {
        const teamResults = matchResults[teamId];
        return CompetitionTeam.where('id', teamId).fetch()
        .then(competitionTeam => {
          // logger.info({ team_id: teamId, num_matches_played: teamResults.num_matches_played },
          //   'Setting num_matches_played');
          const fields = [
            'num_matches_played',
            'num_matches_win',
            'num_matches_loss',
            'num_matches_draw',
            'goals_scored',
            'goals_received',
          ];
          fields.forEach(field => {
            competitionTeam.set(field, teamResults[field]);
          });
          return competitionTeam.save();
        });
      });

      return Promise.all(promises);
    })
    .catch(err => {
      logger.error({ error: err, error_message: err.message }, 'Error calculating competition standings');
    });
  }
}

const competitionController = new CompetitionController();
export default competitionController;
