import * as mocha from 'mocha';
import * as chai from 'chai';
import { knex, bookshelf } from '../src/db';
import logger from '../src/logger';

import Club from '../src/api/club/club.model';
import CompetitionTeam from '../src/api/competition-team/competition-team.model';
import Competition from '../src/api/competition/competition.model';
import User from '../src/api/user/user.model';
import competitionController from '../src/api/competition/competition.controller';

const expect = chai.expect;

describe('Competition calculate standings', () => {
  it('is a function', () => {
    const competitionId = 2;
    return competitionController.calculateStandings({ competitionId: competitionId })
    .then(() => {
      return Competition
      .where('id', competitionId)
      .fetch({ withRelated: ['teams', 'rounds', 'matches', 'competitionTemplate'] });
    })
    .then(competition => {

      const expectedStandings = [
        // team_id, num_matches_played, num_matches_win, num_matches_loss, num_matches_draw,
        // goals_scored, goals_received
        //TI  MP  MW  ML  MD  GS  GR
        [  1,  2,  0,  2,  0,  4,  6, ],
        [  2,  2,  1,  0,  1,  5,  4, ],
        [  3,  2,  2,  0,  0,  9,  5, ],
        [  4,  2,  1,  1,  0,  8,  5, ],
        [  5,  2,  1,  1,  0,  3,  6, ],
        [  6,  2,  2,  0,  0, 10,  1, ],
        [  7,  2,  0,  2,  0,  2,  6, ],
        [  8,  2,  1,  0,  1,  7,  3, ],
        [  9,  2,  0,  0,  2,  4,  4, ],
        [ 10,  2,  0,  2,  0,  5, 11, ],
        [ 11,  2,  1,  1,  0,  2,  3, ],
        [ 12,  2,  1,  1,  0,  3,  2, ],
        [ 13,  2,  1,  1,  0,  5, 11, ],
        [ 14,  2,  0,  0,  2,  3,  3, ],
      ];
      const teams = competition.related('teams').toJSON();

      expectedStandings.forEach(es => {
        // logger.debug({ team_id: es[0] }, 'Checking team results');
        const team = teams.find(team => { return team.id === es[0]; });
        expect(team.num_matches_played).to.equal(es[1]);
        expect(team.num_matches_win   ).to.equal(es[2]);
        expect(team.num_matches_loss  ).to.equal(es[3]);
        expect(team.num_matches_draw  ).to.equal(es[4]);
        expect(team.goals_scored      ).to.equal(es[5]);
        expect(team.goals_received    ).to.equal(es[6]);
      });
    });
  });


});
