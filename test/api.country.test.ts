import * as mocha from 'mocha';
import { chapp, app, expect, authedReq, disableAuthentication, enableAuthentication } from './helper';

describe('countries endpoint', () => {
  beforeEach(disableAuthentication);
  afterEach(enableAuthentication);

  describe('GET countries', () => {
    it('should include The Netherlands', () => {
      return chapp.get('/api/v1/countries')
        .then(res => {
          let nl = res.body.find(country => country.code === 'nl');
          expect(nl).to.exist;
          expect(nl).to.include.all.keys([
            'name',
            'code',
          ]);
        });
    });
  });

  describe('GET country', () => {
    it('responds with country object', () => {
      return chapp.get('/api/v1/countries/1')
        .then(res => {
          let nl = res.body;
          expect(nl).to.include.all.keys([
            'name',
            'code',
          ]);
          expect(nl.name).to.equal('The Netherlands');
        });
    });
  });

  describe('POST country', () => {
    it('responds with created country object', () => {
      return chapp.post('/api/v1/countries')
        .send({ code: 'be', name: 'Belgium' })
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          let be = res.body;
          expect(be).to.include.all.keys([
            'name',
            'code',
          ]);
          expect(be.code).to.equal('be');
          expect(be.name).to.equal('Belgium');
        });
    });

    it('errors for invalid code', () => {
      return chapp.post('/api/v1/countries')
        .send({ code: 'GERM', name: 'Germany' })
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
          expect(errObj.code).to.equal('ValidationError');
          expect(errObj.message).to.contain('GERM');
          expect(errObj.message).to.contain('code');
        });
    });
  });

  describe('PUT country', () => {
    it('updates data and responds with updated country', () => {
      return chapp.put('/api/v1/countries/1')
        .send({ name: 'Netherlands' })
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          let be = res.body;
          expect(be).to.include.all.keys([
            'name',
            'code',
          ]);
          expect(be.code).to.equal('nl');
          expect(be.name).to.equal('Netherlands');

          // TODO: put created_at and updated_at tests in a separate test file.
          const createdAt = (new Date(be.created_at)).getTime();
          const updatedAt = (new Date(be.updated_at)).getTime();
          expect(updatedAt).to.be.above(createdAt);
        });
    });
  });

  describe('DELETE country', () => {
    it('deletes an existing country object', () => {
      let countryId;
      // Create a new country
      return chapp.post('/api/v1/countries')
        .send({ code: 'zz', name: 'To Be Deleted' })
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res).to.be.json;
          countryId = res.body.id;
          // Delete the country
          return authedReq('del', '/countries/' + countryId);
        })
        .then(res => {
          expect(res.status).to.equal(204);
          // Re-fetch the country; should result in 404.
          return chapp.get('/countries/' + countryId);
        })
        .then(res => {
          expect('we should not').to.equal('end up here');
        })
        .catch(err => {
          expect(err.status).to.equal(404);
        });
    });
  });
});
