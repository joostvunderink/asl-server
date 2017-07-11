import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Filter: order', () => {
  it('orders clubs by name', () => {
    return chai.request(app).get('/api/v1/clubs/?filter={"order":"name ASC"}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        const clubs = res.body;
        expect(clubs).to.be.an('array');
        expect(clubs).to.have.length(14);
        const clubNames = clubs.map(club => { return club.name; });
        expect(clubNames).to.deep.equal([
          'Buitenveldert SC',
          'DRC',
          'dvc Buiksloot',
          'Germaan/De Eland ASC',
          'Ilpendam',
          'IVV',
          'Meteoor De',
          'Nieuw-West United SV',
          'Purmerend FC',
          'RCZ',
          'SDZ',
          'Swift',
          'Wherevogels De',
          'Zaandijk',
        ]);
      });
  });

  it('orders clubs by name desc', () => {
    return chai.request(app).get('/api/v1/clubs/?filter={"order":"name DESC"}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        const clubs = res.body;
        expect(clubs).to.be.an('array');
        expect(clubs).to.have.length(14);
        const clubNames = clubs.map(club => { return club.name; });
        expect(clubNames).to.deep.equal([
          'Zaandijk',
          'Wherevogels De',
          'Swift',
          'SDZ',
          'RCZ',
          'Purmerend FC',
          'Nieuw-West United SV',
          'Meteoor De',
          'IVV',
          'Ilpendam',
          'Germaan/De Eland ASC',
          'dvc Buiksloot',
          'DRC',
          'Buitenveldert SC',
        ]);
      });
  });

});
