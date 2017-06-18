import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Filter: where, operator: equals', () => {
  it('returns 400 for invalid JSON in filter', () => {
    return chai.request(app).get('/regions?filter={"where":{"region_id":1}') // Missing }
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(400);
        // console.log(err);
        const errObj = JSON.parse(err.response.error.text);
        expect(errObj).to.have.all.keys([
          'message',
          'code',
        ]);
        expect(errObj.code).to.equal('JsonParseError');
        expect(errObj.message).to.contain('Error parsing "filter" parameter:');
      });
  });
});
