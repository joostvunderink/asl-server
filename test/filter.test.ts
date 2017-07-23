import * as mocha from 'mocha';
import { chapp, app, expect, authedReq, disableAuth, enableAuth } from './helper';

describe('Filter: errors', () => {
  beforeEach(disableAuth);
  afterEach(enableAuth);

  it('returns 400 for invalid JSON in filter: missing closing tag', () => {
    return chapp.get('/api/v1/regions?filter={"where":{"region_id":1}')
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(400);
        const errObj = JSON.parse(err.response.error.text);
        expect(errObj).to.deep.equal({
          errorMessage: 'Error parsing "filter" parameter: SyntaxError: Unexpected end of JSON input',
          errorCode: 'ParseError',
          errorData: {}
        });
      });
  });
  it('returns 400 for invalid JSON in filter: string instead of JSON', () => {
    return chapp.get('/api/v1/regions?filter=abc')
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(400);
        const errObj = JSON.parse(err.response.error.text);
        expect(errObj).to.deep.equal({
          errorMessage: 'Error parsing "filter" parameter: SyntaxError: Unexpected token a in JSON at position 0',
          errorCode: 'ParseError',
          errorData: {}
        });
      });
  });
});
