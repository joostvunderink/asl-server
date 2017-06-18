import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET regions', () => {
  it('responds with JSON array', () => {
    return chai.request(app).get('/regions')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length.above(0);
      });
  });

  it('should include West 1', () => {
    return chai.request(app).get('/regions')
      .then(res => {
        let obj = res.body.find(region => region.name === 'West 1');
        expect(obj).to.exist;
        expect(obj).to.have.all.keys([
          'id',
          'name',
          'description',
          'country_id',
          'sport_id',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
      });
  });
});

describe('GET region', () => {
  it('responds with region object', () => {
    return chai.request(app).get('/regions/1')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        let obj = res.body;
        expect(obj).to.have.all.keys([
          'id',
          'name',
          'description',
          'country_id',
          'sport_id',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
        expect(obj.name).to.equal('West 1');
      });
  });

  it('responds with 404 when the object does not exist', () => {
    return chai.request(app).get('/regions/999')
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      });
  });
});

describe('POST region', () => {
  it('responds with created region object', () => {
    return chai.request(app).post('/regions')
      .send({ name: 'Zuid 1', description: 'West South part of NL' })
      .then(res => {
        expect(res.status).to.equal(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        let obj = res.body;
        expect(obj).to.have.all.keys([
          'id',
          'name',
          'description',
          'country_id',
          'sport_id',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
        expect(obj.name).to.equal('Zuid 1');
        expect(obj.description).to.equal('West South part of NL');
      });
  });

  it('handles invalid fields', () => {
    return chai.request(app).post('/regions')
      .send({ name: 'East 5', description: 'Fifth east', capital: 'Assen' })
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
        expect(errObj.message).to.contain('capital');
      });
  });
});

describe('PUT region', () => {
  it('updates data and responds with updated region', () => {
    return chai.request(app).put('/regions/1')
      .send({ description: 'new description' })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        let be = res.body;
        expect(be).to.have.all.keys([
          'id',
          'name',
          'description',
          'country_id',
          'sport_id',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
        expect(be.description).to.equal('new description');
        expect(be.name).to.equal('West 1');

        // TODO: put created_at and updated_at tests in a separate test file.
        const createdAt = (new Date(be.created_at)).getTime();
        const updatedAt = (new Date(be.updated_at)).getTime();
        expect(updatedAt).to.be.above(createdAt);
      });
  });

  it('responds with 404 when the object does not exist', () => {
    return chai.request(app).put('/regions/999')
      .send({ description: 'new description' })
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      });
  });
});

describe('DELETE region', () => {
  it('deletes an existing region object', () => {
    let regionId;
    // Create a new region
    return chai.request(app).post('/regions')
      .send({ description: 'To Be Deleted', name: 'tbd' })
      .then(res => {
        expect(res.status).to.equal(201);
        expect(res).to.be.json;
        regionId = res.body.id;
        // Delete the region
        return chai.request(app).del('/regions/' + regionId);
      })
      .then(res => {
        expect(res.status).to.equal(204);
        // Re-fetch the region; should result in 404.
        return chai.request(app).get('/regions/' + regionId);
      })
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      });
  });
});
