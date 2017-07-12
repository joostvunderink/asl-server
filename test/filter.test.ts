import * as mocha from 'mocha';
import { chapp, app, expect, authedReq } from './helper';

describe('Filter: where, operator: equals', () => {
  it('returns 400 for invalid JSON in filter', () => {
    return authedReq('get', '/api/v1/regions?filter={"where":{"region_id":1}') // Missing }
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
