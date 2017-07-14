import * as mocha from 'mocha';
import { chapp, app, expect, authedReq, disableAuthentication, enableAuthentication } from './helper';

describe('Filter: limit', () => {
  beforeEach(disableAuthentication);
  afterEach(enableAuthentication);

  it('limits results', () => {
    return chapp.get('/api/v1/clubs/?filter={"limit":4}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        const clubs = res.body;
        expect(clubs).to.be.an('array');
        expect(clubs).to.have.length(4);
      });
  });

  it('limit works together with order', () => {
    return chapp.get('/api/v1/clubs/?filter={"order":"name DESC","limit":5}')
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
