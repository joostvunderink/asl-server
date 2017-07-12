import * as mocha from 'mocha';
import { chapp, app, expect, authedReq } from './helper';

describe('Filter: skip', () => {
  it('skips a given amount of results', () => {
    return authedReq('get', '/api/v1/clubs/?filter={"order":"name DESC","limit":5,"skip":5}')
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
