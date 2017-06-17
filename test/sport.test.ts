import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET sports', () => {
  it('responds with JSON array', () => {
    return chai.request(app).get('/sports')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(1);
      });
  });

  it('should include Football', () => {
    return chai.request(app).get('/sports')
      .then(res => {
        let obj = res.body.find(sport => sport.name === 'football');
        expect(obj).to.exist;
        expect(obj).to.have.all.keys([
          'id',
          'name',
          'description',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
      });
  });
});

describe('GET sport', () => {
  it('responds with sport object', () => {
    return chai.request(app).get('/sports/1')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        let obj = res.body;
        expect(obj).to.have.all.keys([
          'id',
          'name',
          'description',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
        expect(obj.name).to.equal('football');
      });
  });

  it('responds with 404 when the object does not exist', () => {
    return chai.request(app).get('/sports/999')
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      });
  });
});

describe('POST sport', () => {
  it('responds with created sport object', () => {
    return chai.request(app).post('/sports')
      .send({ description: 'Hockey on grass, not on ice', name: 'hockey' })
      .then(res => {
        expect(res.status).to.equal(201);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        let obj = res.body;
        expect(obj).to.have.all.keys([
          'id',
          'name',
          'description',
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
        expect(obj.description).to.equal('Hockey on grass, not on ice');
        expect(obj.name).to.equal('hockey');
      });
  });

  it('handles invalid fields', () => {
    return chai.request(app).post('/sports')
      .send({ description: 'test', name: 'snooker', num_red_balls: 15 })
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
        expect(errObj.message).to.contain('num_red_balls');
      });
  });
});

describe('PUT sport', () => {
  it('updates data and responds with updated sport', () => {
    return chai.request(app).put('/sports/1')
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
          'created_at',
          'created_by',
          'updated_at',
          'deleted_at',
        ]);
        expect(be.description).to.equal('new description');
        expect(be.name).to.equal('football');

        // TODO: put created_at and updated_at tests in a separate test file.
        const createdAt = (new Date(be.created_at)).getTime();
        const updatedAt = (new Date(be.updated_at)).getTime();
        expect(updatedAt).to.be.above(createdAt);
      });
  });

  it('responds with 404 when the object does not exist', () => {
    return chai.request(app).put('/sports/999')
      .send({ description: 'new description' })
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      });
  });
});

describe('DELETE sport', () => {
  it('deletes an existing sport object', () => {
    let sportId;
    // Create a new sport
    return chai.request(app).post('/sports')
      .send({ description: 'To Be Deleted', name: 'tbd' })
      .then(res => {
        expect(res.status).to.equal(201);
        expect(res).to.be.json;
        sportId = res.body.id;
        // Delete the sport
        return chai.request(app).del('/sports/' + sportId);
      })
      .then(res => {
        expect(res.status).to.equal(204);
        // Re-fetch the sport; should result in 404.
        return chai.request(app).get('/sports/' + sportId);
      })
      .then(res => {
        expect('we should not').to.equal('end up here');
      })
      .catch(err => {
        expect(err.status).to.equal(404);
      });
  });
});
