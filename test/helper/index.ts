import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../../src/app';
var permission = require('../../src/core/permission');

chai.use(chaiHttp);
const expect = chai.expect;
const chapp = chai.request(app);
const validAccessToken = '78454744c8b846b4021ca935735d162e7ebada1a'; // see seeds/unittest/core_data.js

function authedReq(method, url) {
  return chapp[method](url).set('Authorization', 'Bearer ' + validAccessToken);
}

function disableAuthentication() {
  app.locals.authenticationDisabled = true;
}

function enableAuthentication() {
  app.locals.authenticationDisabled = false;
}

let originalCan;
function disableAuthorisation() {
  originalCan = permission.can;
  permission.can = function() { return Promise.resolve(); }
}

function enableAuthorisation() {
  permission.can = originalCan;
}

function disableAuth() {
  disableAuthentication();
  disableAuthorisation();
}

function enableAuth() {
  enableAuthentication();
  enableAuthorisation();
}

// before((done) => {
//   done();
// });

export {
  app, chapp, expect, validAccessToken, authedReq,
  disableAuthentication, enableAuthentication,
  disableAuthorisation, enableAuthorisation,
  disableAuth, enableAuth,
};
