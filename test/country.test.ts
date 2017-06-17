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

  it('responds with 404 for not found', () => {
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
});

