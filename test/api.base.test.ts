import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

const testData = [
  {
     modelName: 'countries',
     idPresent: 1,
     idNotPresent: 999,
  },
  {
     modelName: 'sports',
     idPresent: 1,
     idNotPresent: 999,
  },
  {
     modelName: 'regions',
     idPresent: 1,
     idNotPresent: 999,
  },
  {
     modelName: 'clubs',
     idPresent: 1,
     idNotPresent: 999,
  },
  {
     modelName: 'seasons',
     idPresent: 1,
     idNotPresent: 999,
  },
  {
     modelName: 'competition-templates',
     idPresent: 1,
     idNotPresent: 999,
  },
  {
     modelName: 'competitions',
     idPresent: 1,
     idNotPresent: 999,
  },
  {
     modelName: 'teams',
     idPresent: 1,
     idNotPresent: 999,
  },
  {
     modelName: 'persons',
     idPresent: 1,
     idNotPresent: 999,
  },
];

describe('GET /<model>', () => {
  testData.forEach(td => {
    it('responds with JSON array for ' + td.modelName, () => {
      return chai.request(app).get('/' + td.modelName)
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length.above(0);
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
