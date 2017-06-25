import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Filter: order', () => {
  it('limits results', () => {
    return chai.request(app).get('/clubs/?filter={"limit":4}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        const clubs = res.body;
        expect(clubs).to.be.an('array');
        expect(clubs).to.have.length(4);
      });
  });

  it('limit works together with order', () => {
    return chai.request(app).get('/clubs/?filter={"order":"name DESC","limit":5}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        const clubs = res.body;
        expect(clubs).to.be.an('array');
        expect(clubs).to.have.length(5);
        const clubNames = clubs.map(club => { return club.name; });
        expect(clubNames).to.deep.equal([
          'Zaandijk',
          'Wherevogels De',
          'Swift',
          'SDZ',
          'RCZ',
        ]);
      });
  });

});
