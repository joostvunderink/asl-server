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
    td.validInputs.forEach(input => {
      it(td.route + ': responds with created object - ' + input.name, () => {
        return chapp.post('/api/v1/' + td.route)
          .send(input.data)
          .then(res => {
            expect(res.status).to.equal(201);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            let createdObject = res.body;
            expect(createdObject).to.include.all.keys(Object.keys(input.data));
            Object.keys(input.data).forEach(key => {
              expect(createdObject[key]).to.equal(input.data[key]);
            });
          });
      });
    });

    td.invalidInputs.forEach(input => {
      it(td.route + ': errors for invalid input - ' + input.name, () => {
        return chapp.post('/api/v1/' + td.route)
          .send(input.data)
          .then(res => {
            expect('we should not').to.equal('end up here');
          })
          .catch(err => {
            expect(err.status).to.equal(400);
            // TODO: Figure out if this is really the best way to get the error text.
            const errObj = JSON.parse(err.response.error.text);
            expect(errObj).to.have.all.keys(['code', 'message']);
            expect(errObj.code).to.equal('ValidationError');
            // expect(errObj.message).to.contain('GERM');
            // expect(errObj.message).to.contain('code');
          });
      });
    });
  });

});
