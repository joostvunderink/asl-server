import * as mocha from 'mocha';
import { chapp, app, expect, authedReq, disableAuth, enableAuth } from './helper';

describe('regions endpoint', () => {
  beforeEach(disableAuth);
  afterEach(enableAuth);

  describe('GET regions', () => {
    it('should include West 1', () => {
      return chapp.get('/api/v1/regions')
        .then(res => {
          let obj = res.body.find(region => region.name === 'West 1');
          expect(obj).to.exist;
          expect(obj).to.contain.all.keys([
            'name',
            'description',
            'country_id',
            'sport_id',
          ]);
        });
    });
  });

  describe('GET region', () => {
    it('responds with region object', () => {
      return chapp.get('/api/v1/regions/1')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          let obj = res.body;
          expect(obj).to.contain.all.keys([
            'name',
            'description',
            'country_id',
            'sport_id',
          ]);
          expect(obj.name).to.equal('West 1');
        });
    });
  });

  describe('GET region with country and sport included', () => {
    it('responds with region object', () => {
      return chapp.get('/api/v1/regions/1?filter={"include":["country","sport"]}')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          let obj = res.body;
          expect(obj).to.contain.all.keys([
            'name',
            'description',
            'country_id',
            'sport_id',
          ]);
          expect(obj.name).to.equal('West 1');
          expect(obj.country.code).to.equal('nl');
          expect(obj.sport.name).to.equal('football');
        });
    });
  });

  describe('POST region', () => {
    it('responds with created region object', () => {
      return chapp.post('/api/v1/regions')
        .send({ name: 'Zuid 1', description: 'West South part of NL' })
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          let obj = res.body;
          expect(obj).to.contain.all.keys([
            'id',
            'name',
            'description',
            'country_id',
            'sport_id',
          ]);
          expect(obj.name).to.equal('Zuid 1');
          expect(obj.description).to.equal('West South part of NL');
        });
    });
  });

  describe('PUT region', () => {
    it('updates data and responds with updated region', () => {
      return chapp.put('/api/v1/regions/1')
        .send({ description: 'new description' })
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          let be = res.body;
          expect(be).to.contain.all.keys([
            'name',
            'description',
            'country_id',
            'sport_id',
          ]);
          expect(be.description).to.equal('new description');
          expect(be.name).to.equal('West 1');

          // TODO: put created_at and updated_at tests in a separate test file.
          const createdAt = (new Date(be.created_at)).getTime();
          const updatedAt = (new Date(be.updated_at)).getTime();
          expect(updatedAt).to.be.above(createdAt);
        });
    });
  });

  describe('DELETE region', () => {
    it('deletes an existing region object', () => {
      let regionId;
      // Create a new region
      return chapp.post('/api/v1/regions')
        .send({ description: 'To Be Deleted', name: 'tbd' })
        .then(res => {
          expect(res.status).to.equal(201);
          expect(res).to.be.json;
          regionId = res.body.id;
          // Delete the region
          return chapp.del('/api/v1/regions/' + regionId);
        })
        .then(res => {
          expect(res.status).to.equal(204);
          // Re-fetch the region; should result in 404.
          return chapp.get('/api/v1/regions/' + regionId);
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
