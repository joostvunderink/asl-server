import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET countries', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/countries')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(1);
      });
  });

  it('should include The Netherlands', () => {
    return chai.request(app).get('/countries')
      .then(res => {
        let nl = res.body.find(country => country.code === 'nl');
        expect(nl).to.exist;
        expect(nl).to.have.all.keys([
          'id',
          'name',
          'code',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
      });
  });

});
