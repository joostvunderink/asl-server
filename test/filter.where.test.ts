import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Filter: where, operator: equals', () => {
  it('finds 3 regions where country_id = 1', () => {
    return chai.request(app).get('/regions?filter={"where":{"country_id":1}}')
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
  it('finds 1 region where country_id = 1', () => {
    return chai.request(app).get('/regions?filter={"where":{"sport_id":2}}')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(1);
        res.body.forEach(region => {
          expect(region.sport_id).to.equal(2);
        });
      });
  });
});
