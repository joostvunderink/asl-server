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

      let teamsResults = {};
      teams.forEach(team => {
        teamsResults[team.id] = {
          num_matches_played: 0,
          num_matches_win   : 0,
          num_matches_loss  : 0,
          num_matches_draw  : 0,
          goals_scored      : 0,
          goals_received    : 0,
          rank              : 1,
          points            : 0,
          rankScore         : 0,
        };
      });

      let maxMatchesPlayed = 0;
      matches.forEach(match => {
        // logger.info({ match }, 'le match');
        if (match.home_team_score > match.away_team_score) {
          teamsResults[match.home_team_id].num_matches_win += 1;
          teamsResults[match.away_team_id].num_matches_loss += 1;
          teamsResults[match.home_team_id].points += 3;
        } else if (match.home_team_score < match.away_team_score) {
          teamsResults[match.home_team_id].num_matches_loss += 1;
          teamsResults[match.away_team_id].num_matches_win += 1;
          teamsResults[match.away_team_id].points += 3;
        } else {
          teamsResults[match.home_team_id].num_matches_draw += 1;
          teamsResults[match.away_team_id].num_matches_draw += 1;
          teamsResults[match.home_team_id].points += 1;
          teamsResults[match.away_team_id].points += 1;
        }
        
        teamsResults[match.home_team_id].num_matches_played += 1;
        teamsResults[match.home_team_id].goals_scored += match.home_team_score;
        teamsResults[match.home_team_id].goals_received += match.away_team_score;

        teamsResults[match.away_team_id].num_matches_played += 1;
        teamsResults[match.away_team_id].goals_scored += match.away_team_score;
        teamsResults[match.away_team_id].goals_received += match.home_team_score;

        // We need the maximum amount of matches played for a single team for
        // the rank calculation later on.
        if (teamsResults[match.home_team_id].num_matches_played > maxMatchesPlayed) {
          maxMatchesPlayed = teamsResults[match.home_team_id].num_matches_played;
        }
        if (teamsResults[match.away_team_id].num_matches_played > maxMatchesPlayed) {
          maxMatchesPlayed = teamsResults[match.away_team_id].num_matches_played;
        }
      });

      // Determine a special rank score for each team's results.
      // This score will allow a simple numerical sort to determine the teams'
      // rankings.
      // The score contains the following numbers:
      // 1. Verliespunten: 900 - (3 * max_num_matches_played) + points
      // 2. Points
      // 3. Doelsaldo: goals_scored - goals_received
      // 4. Goals: goals_scored

      // teamRanks is for later use, to sort the rank scores to order the teams.
      let teamRanks = [];
      teams.forEach(team => {
        let tr = teamsResults[team.id];
        const verliespunten = 
        tr.rankScore = 
          1000000000 * (999 - (3 * maxMatchesPlayed) + tr.points) +
             1000000 * tr.points +
                1000 * (tr.goals_scored - tr.goals_received) +
                   1 * tr.goals_scored;
        teamRanks.push({ team_id: team.id, rankScore: tr.rankScore });
      });
   
      // Order the teams by the rank score.
      teamRanks = teamRanks.sort((a, b) => {
        return b.rankScore - a.rankScore;
      });

      // Update the team results with the ranks.
      teamRanks.forEach((tr, index) => {
        teamsResults[tr.team_id].rank = index + 1;
      });

      let promises = Object.keys(teamsResults).map(teamId => {
        const teamResults = teamsResults[teamId];
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
            'points',
            'rank',
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
