import * as mocha from 'mocha';
import { chapp, app, expect, authedReq } from './helper';

describe('GET request with invalid credentials', () => {
  it('should be denied with a 401 error for invalid token', () => {
    return chapp.get('/api/v1/countries').set('Authorization', 'Bearer 78454744c8b846b4021ca935735d162e7ebadxxx')
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(401);
        // TODO: Figure out if this is really the best way to get the error text.
        const errObj = JSON.parse(err.response.error.text);
        expect(errObj).to.have.all.keys([
          'message',
          'code',
        ]);
        expect(errObj.code).to.equal('ERR_AUTH');
        expect(errObj.message).to.contain('token');
        expect(errObj.message).to.contain('invalid');
      });
  });
  it('should be denied with a 400 error for absent token', () => {
    return chapp.get('/api/v1/countries')
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(400);
        // TODO: Figure out if this is really the best way to get the error text.
        const errObj = JSON.parse(err.response.error.text);
        expect(errObj).to.have.all.keys([
          'message',
          'code',
        ]);
        expect(errObj.code).to.equal('ERR_AUTH');
        expect(errObj.message).to.contain('token');
        expect(errObj.message).to.contain('not found');
      });
  });
});
