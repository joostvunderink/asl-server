import * as mocha from 'mocha';
import { chapp, expect, disableAuth, enableAuth } from './helper';
import * as fs from 'fs';


let testData = [];
const testDataDir = 'testdata/validation';
const filenames = fs.readdirSync('./test/' + testDataDir);
filenames.forEach(filename => {
  const td = require('./' + testDataDir + '/' + filename).testData;
  testData.push(td);
});

describe('Validation', () => {
  beforeEach(disableAuth);
  afterEach(enableAuth);

  testData.forEach(td => {
    td.okTests && td.okTests.forEach(tc => {
      it(tc.input.method + ' ' + td.route + ' - ok: ' + tc.name, () => {
        return tc.before.reduce((prev, cur) => {
          return prev.then(() => {
            return chapp.post('/api/v1/' + td.route)
              .send(cur.data);
          });
        }, Promise.resolve())
        .then(res => {
          return chapp[tc.input.method]('/api/v1/' + (tc.input.route || td.route)).send(tc.input.data);
        })
        .then(res => {
          expect(res.status).to.equal(tc.verify.statusCode);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          let createdObject = res.body;
          expect(createdObject).to.include.all.keys(Object.keys(tc.verify.body));
          Object.keys(tc.verify.body).forEach(key => {
            expect(createdObject[key]).to.equal(tc.verify.body[key]);
          });
        })
        .catch(err => {
          console.error(err);
          expect('we should not').to.equal('end up here');
          throw err;
        });
      });
    });

    td.errorTests && td.errorTests.forEach(tc => {
      it(tc.input.method + ' ' + td.route + ' - error: ' + tc.name, () => {
        return tc.before.reduce((prev, cur) => {
          return prev.then(() => {
            return chapp.post('/api/v1/' + (cur.route || td.route))
              .send(cur.data);
          });
        }, Promise.resolve())
        .then(res => {
          return chapp[tc.input.method]('/api/v1/' + (tc.input.route || td.route)).send(tc.input.data);
        })
        .then(res => {
          console.error(res.body);
          expect('we should not').to.equal('end up here');
        })
        .catch(err => {
          // console.log(err);
          // console.log(err.response.error.text);
          expect(err.status).to.equal(tc.verify.statusCode);

          // TODO: Figure out if this is really the best way to get the error text.
          const errObj = JSON.parse(err.response.error.text);
          expect(errObj).to.have.all.keys(['code', 'message']);
          expect(errObj.code).to.equal(tc.verify.errorCode);
          // expect(errObj.message).to.contain('GERM');
          // expect(errObj.message).to.contain('code');
        })
        .catch(err => {
          console.log('Test error: ' + err);
          throw err;
        });
      });
    });

  });

});
