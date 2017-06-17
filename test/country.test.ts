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

describe('GET country', () => {
  it('responds with country object', () => {
    return chai.request(app).get('/countries/1')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        let nl = res.body;
        expect(nl).to.have.all.keys([
          'id',
          'name',
          'code',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
        expect(nl.name).to.equal('The Netherlands');
      });
  });

  it('responds with 404 when the object does not exist', () => {
    return chai.request(app).get('/countries/999')
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      });
  });
});

describe('POST country', () => {
  it('responds with created country object', () => {
    return chai.request(app).post('/countries')
      .send({ code: 'be', name: 'Belgium' })
      .then(res => {
        expect(res.status).to.equal(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        let be = res.body;
        expect(be).to.have.all.keys([
          'id',
          'name',
          'code',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
        expect(be.code).to.equal('be');
        expect(be.name).to.equal('Belgium');
      });
  });

  it('handles invalid fields', () => {
    return chai.request(app).post('/countries')
      .send({ code: 'de', name: 'Germany', local_name: 'Deutschland' })
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
        expect(errObj.code).to.equal('ER_BAD_FIELD_ERROR');
        expect(errObj.message).to.contain('local_name');
      });
  });
});

describe('PUT country', () => {
  it('updates data and responds with updated country', () => {
    return chai.request(app).put('/countries/1')
      .send({ name: 'Netherlands' })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        let be = res.body;
        expect(be).to.have.all.keys([
          'id',
          'name',
          'code',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
        expect(be.code).to.equal('nl');
        expect(be.name).to.equal('Netherlands');

        // TODO: put created_at and updated_at tests in a separate test file.
        const createdAt = (new Date(be.created_at)).getTime();
        const updatedAt = (new Date(be.updated_at)).getTime();
        expect(updatedAt).to.be.above(createdAt);
      });
  });

  it('responds with 404 when the object does not exist', () => {
    return chai.request(app).put('/countries/999')
      .send({ name: 'Netherlands' })
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      });
  });
});

describe('DELETE country', () => {
  it('deletes an existing country object', () => {
    let countryId;
    // Create a new country
    return chai.request(app).post('/countries')
      .send({ code: 'tbd', name: 'To Be Deleted' })
      .then(res => {
        expect(res.status).to.equal(201);
        expect(res).to.be.json;
        countryId = res.body.id;
        // Delete the country
        return chai.request(app).del('/countries/' + countryId);
      })
      .then(res => {
        expect(res.status).to.equal(204);
        // Re-fetch the country; should result in 404.
        return chai.request(app).get('/countries/' + countryId);
      })
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      });
  });
});
