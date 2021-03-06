import * as mocha from 'mocha';
import { chapp, app, expect, authedReq, disableAuth, enableAuth } from './helper';

describe('sports endpoint', () => {
  beforeEach(disableAuth);
  afterEach(enableAuth);

  describe('GET sports', () => {
    it('should include Football', () => {
      return chapp.get('/api/v1/sports')
        .then(res => {
          let obj = res.body.find(sport => sport.name === 'football');
          expect(obj).to.exist;
          expect(obj).to.include.all.keys([
            'name',
            'description',
          ]);
        });
    });
  });

  describe('GET sport', () => {
    it('responds with sport object', () => {
      return chapp.get('/api/v1/sports/1')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          let obj = res.body;
          expect(obj).to.contain.all.keys([
            'name',
            'description',
          ]);
          expect(obj.name).to.equal('football');
        });
    });

    it('responds with 404 when the object does not exist', () => {
      return chapp.get('/api/v1/sports/999')
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
      return chapp.post('/api/v1/sports')
        .send({ description: 'Hockey on grass, not on ice', name: 'hockey' })
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          let obj = res.body;
          expect(obj).to.contain.all.keys([
            'id',
            'name',
            'description',
          ]);
          expect(obj.description).to.equal('Hockey on grass, not on ice');
          expect(obj.name).to.equal('hockey');
        });
    });
  });

  describe('PUT sport', () => {
    it('updates data and responds with updated sport', () => {
      return chapp.put('/api/v1/sports/1')
        .send({ description: 'new description' })
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          let be = res.body;
          expect(be).to.contain.all.keys([
            'name',
            'description',
          ]);
          expect(be.description).to.equal('new description');
          expect(be.name).to.equal('football');

          // TODO: put created_at and updated_at tests in a separate test file.
          const createdAt = (new Date(be.created_at)).getTime();
          const updatedAt = (new Date(be.updated_at)).getTime();
          expect(updatedAt).to.be.above(createdAt);
        });
    });
  });

  describe('DELETE sport', () => {
    it('deletes an existing sport object', () => {
      let sportId;
      // Create a new sport
      return chapp.post('/api/v1/sports')
        .send({ description: 'To Be Deleted', name: 'sport name' })
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res).to.be.json;
          sportId = res.body.id;
          // Delete the sport
          return chapp.del('/sports/' + sportId);
        })
        .then(res => {
          expect(res.status).to.equal(204);
          // Re-fetch the sport; should result in 404.
          return chapp.get('/api/v1/sports/' + sportId);
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