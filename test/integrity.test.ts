import * as mocha from 'mocha';
import { chapp, expect, disableAuth, enableAuth } from './helper';
import * as fs from 'fs';


let testData = [];
const testDataDir = 'testdata/integrity';
const filenames = fs.readdirSync('./test/' + testDataDir);
filenames.forEach(filename => {
  const td = require('./' + testDataDir + '/' + filename).testData;
  testData.push(td);
});

describe('Integrity', () => {
  beforeEach(disableAuth);
  afterEach(enableAuth);

  testData.forEach(td => {
    // Verify that it's not possible to insert
    td.duplicateCreateTests && td.duplicateCreateTests.forEach(input => {
      it(td.route + ': errors for invalid input - ' + input.name, () => {
        return chapp.post('/api/v1/' + td.route)
          .send(input.init)
          .then(res => {
            return chapp.post('/api/v1/' + td.route).send(input.data);
          })    
          .then(res => {
            expect('we should not').to.equal('end up here');
          })
          .catch(err => {
            expect(err.status).to.equal(400);
            // TODO: Figure out if this is really the best way to get the error text.
            const errObj = JSON.parse(err.response.error.text);
            expect(errObj).to.have.all.keys(['code', 'message']);
            expect(errObj.code).to.equal('ER_DUP_ENTRY');
            // expect(errObj.message).to.contain('GERM');
            // expect(errObj.message).to.contain('code');
          });
      });
    });

    td.createTests && td.createTests.forEach(input => {
      it(td.route + ': errors for invalid input - ' + input.name, () => {
        return input.init.reduce((prev, cur) => {
          return prev.then(() => {
            return chapp.post('/api/v1/' + td.route)
              .send(cur.data);
          });
        }, Promise.resolve())
        .then(res => {
          return chapp.post('/api/v1/' + td.route).send(input.data);
        })    
        .then(res => {
          expect('we should not').to.equal('end up here');
        })
        .catch(err => {
          expect(err.status).to.equal(400);
          // TODO: Figure out if this is really the best way to get the error text.
          const errObj = JSON.parse(err.response.error.text);
          expect(errObj).to.have.all.keys(['code', 'message']);
          console.log(errObj);
          // expect(errObj.code).to.equal('ER_DUP_ENTRY');
          // expect(errObj.message).to.contain('GERM');
          // expect(errObj.message).to.contain('code');
        });
      });
    });
  });

});
