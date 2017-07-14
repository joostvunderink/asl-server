import * as mocha from 'mocha';
import { chapp, app, expect, authedReq, disableAuthentication, enableAuthentication } from './helper';

describe('Filter: where, operator: equals', () => {
  beforeEach(disableAuthentication);
  afterEach(enableAuthentication);
  it('finds regions where country_id = 1', () => {
    return chapp.get('/api/v1/regions?filter={"where":{"country_id":1}}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(3);
        res.body.forEach(region => {
          expect(region.country_id).to.equal(1);
        });
      });
  });
  it('finds regions where country_id = 1 and sport_id = 1', () => {
    return chapp.get('/api/v1/regions?filter={"where":{"country_id":1,"sport_id":1}}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(2);
        res.body.forEach(region => {
          expect(region.country_id).to.equal(1);
          expect(region.sport_id).to.equal(1);
        });
      });
  });
  it('finds regions where sport_id = 1 and region name starts with "West"', () => {
    return chapp.get('/api/v1/regions?filter={"where":{"sport_id":1,"name":{"like":"West%25"}}}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(2);
        res.body.forEach(region => {
          expect(region.sport_id).to.equal(1);
          expect(region.name).to.match(/^West/);
        });
      });
  });
});
