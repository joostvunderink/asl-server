import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Filter: skip', () => {
  it('skips a given amount of results', () => {
    return chai.request(app).get('/api/v1/clubs/?filter={"order":"name DESC","limit":5,"skip":5}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        const clubs = res.body;
        expect(clubs).to.be.an('array');
        expect(clubs).to.have.length(5);
        const clubNames = clubs.map(club => { return club.name; });
        expect(clubNames).to.deep.equal([
          'Purmerend FC',
          'Nieuw-West United SV',
          'Meteoor De',
          'IVV',
          'Ilpendam',
        ]);
      });
  });

});
