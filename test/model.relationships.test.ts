import * as mocha from 'mocha';
import * as chai from 'chai';
import { knex, bookshelf } from '../src/db';
import Team from '../src/api/team/team.model';
import Club from '../src/api/club/club.model';

const expect = chai.expect;

describe('Team/Club relationship', () => {
  it('Team belongs to a Club', () => {
    return Team.where('id', 1).fetch({ withRelated: ['club'] }).then(team => {
      expect(team.id).to.equal(1);
      expect(team.related('club').toJSON().city).to.equal('Amsterdam');
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
    return Team.where('id', 1).fetch({ withRelated: ['clubs'] }).then(team => {
      expect('we should not').to.equal('end up here');
    })
    .catch(err => {
      expect(err.message).to.contain('clubs');
    });
  });
});