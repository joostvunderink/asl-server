import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';
import getRouteConfig from '../src/routes';

const routeConfig = getRouteConfig();

chai.use(chaiHttp);
const expect = chai.expect;

let testData = [];

for (const key in routeConfig) {
  testData.push({
    modelName: key,
    idPresent: 1,
    idNotPresent: 999,
  });
};

describe('GET /<model>', () => {
  testData.forEach(td => {
    it('responds with JSON array for ' + td.modelName, () => {
      return chai.request(app).get('/' + td.modelName)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length.above(0);
          res.body.forEach(obj => {
            expect(obj).to.include.all.keys([
              'id',
              'created_at',
              'created_by',
              'updated_at',
            ]);
            expect(obj).to.not.include.all.keys([
              'deleted_at',
            ]);
          });
        });
    });
  });
});

describe('GET /<model>/:id', () => {
  testData.forEach(td => {
    it('responds with ' + td.modelName + ' object', () => {
      return chai.request(app).get('/' + td.modelName + '/' + td.idPresent)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.all.keys([
            'id',
            'created_at',
            'created_by',
            'updated_at',
          ]);
        });
    });
  });
  
  testData.forEach(td => {
    it('responds with 404 when the ' + td.modelName + ' does not exist', () => {
      return chai.request(app).get('/' + td.modelName + '/' + td.idNotPresent)
        .then(res => {
          expect('we should not').to.equal('end up here');
        })
        .catch(err => {
          expect(err.status).to.equal(404);
        });
    });
  });
});

describe('PUT /<model>/:id', () => {
  testData.forEach(td => {
    it('responds with 404 when the ' + td.modelName + ' does not exist', () => {
      return chai.request(app).put('/' + td.modelName + '/' + td.idNotPresent)
        .send({})
        .then(res => {
          expect('we should not').to.equal('end up here');
        })
        .catch(err => {
          expect(err.status).to.equal(404);
        });
    });
  });
});

describe('POST /<model>', () => {
  testData.forEach(td => {
    it('responds with 400 for invalid field on ' + td.modelName, () => {
      return chai.request(app).post('/countries')
        .send({ an_invalid_field_name: 'value' })
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
          expect(errObj.message).to.contain('an_invalid_field_name');
        });
    });
  });
});

