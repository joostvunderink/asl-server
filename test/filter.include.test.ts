import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Filter: include', () => {
  it('finds a club with 2 teams', () => {
    return chai.request(app).get('/clubs/1?filter={"include":"teams"}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        const club = res.body;
        expect(club).to.be.an('object');
        expect(club.teams).to.be.an('array');
        expect(club.teams).to.have.length(2);
        club.teams.forEach(team => {
          expect(team.name).to.contain('SDZ');
        });
      });
  });
  it('finds a team with a club', () => {
    return chai.request(app).get('/teams/1?filter={"include":"club"}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        const team = res.body;
        expect(team).to.be.an('object');
        expect(team.club).to.be.an('object');
        expect(team.club.name).to.equal('SDZ');
      });
  });
  it('finds all clubs teams included', () => {
    return chai.request(app).get('/clubs/?filter={"include":"teams"}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        const clubs = res.body;
        expect(clubs).to.be.an('array');
        clubs.forEach(club => {
          expect(club.teams).to.be.an('array');
        });
      });
  });
  it('finds all teams with club included', () => {
    return chai.request(app).get('/teams/?filter={"include":"club"}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        const teams = res.body;
        expect(teams).to.be.an('array');
        teams.forEach(team => {
          expect(team.club).to.be.an('object');
        });
      });
  });
});
