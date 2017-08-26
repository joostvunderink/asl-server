import * as mocha from 'mocha';
import * as chai from 'chai';
import { knex, bookshelf } from '../src/db';
import logger from '../src/logger';

import Club from '../src/api/club/club.model';
import CompetitionTeam from '../src/api/competition-team/competition-team.model';
import User from '../src/api/user/user.model';
import Competition from '../src/api/competition/competition.model';

const expect = chai.expect;

describe('CompetitionTeam/Club relationship', () => {
  it('CompetitionTeam belongs to a Club', () => {
    return CompetitionTeam.where('id', 1).fetch({ withRelated: ['club'] }).then(team => {
      expect(team.id).to.equal(1);
      expect(team.related('club').toJSON().city).to.equal('Amsterdam');
      expect(team.related('club').toJSON().name).to.equal('SDZ');
    });
  });

  it('Club has many Teams', () => {
    return Club.where('id', 1).fetch({ withRelated: ['teams'] }).then(club => {
      expect(club.id).to.equal(1);
      const teams = club.related('teams').toJSON();
      expect(teams).to.be.an('array');
      expect(teams).to.have.length(2);
      expect(teams[0].name).to.contain('SDZ');
      expect(teams[1].name).to.contain('SDZ');
    });
  });

  it('Incorrect related query gives error', () => {
    return CompetitionTeam.where('id', 1).fetch({ withRelated: ['clubs'] }).then(team => {
      expect('we should not').to.equal('end up here');
    })
    .catch(err => {
      expect(err.message).to.contain('clubs');
    });
  });
});

describe('User/Role relationship', () => {
  it('User has Roles', () => {
    return User.where('id', 1).fetch({ withRelated: ['roles'] }).then(user => {
      const roles = user.related('roles').toJSON();
      expect(roles).to.be.an('array');
      expect(roles).to.have.length(2);
      const roleNames = roles.map(role => role.name).sort();
      expect(roleNames).to.deep.equal(['admin', 'user']);
    });
  });
});

describe('Competition relationships', () => {
  it('Competition has Teams, Rounds, Matches', () => {
    return Competition.where('id', 2).fetch({ withRelated: ['teams', 'rounds', 'matches',  'competitionTemplate'] })
    .then(competition => {
      const teams = competition.related('teams').toJSON();
      expect(teams).to.be.an('array');
      expect(teams).to.have.length(14);
      const rounds = competition.related('rounds').toJSON();
      expect(rounds).to.be.an('array');
      expect(rounds).to.have.length(4);
      const matches = competition.related('matches').toJSON();
      expect(matches).to.be.an('array');
      expect(matches).to.have.length(14);
      const competitionTemplate = competition.related('competitionTemplate').toJSON();
      expect(competitionTemplate).to.be.an('object');
      expect(competitionTemplate.name).to.equal('4E');
    });
  });
});
