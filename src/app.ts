import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import getRouteConfig from './routes';
import { initOauth } from './oauth/routes';
import { handleError } from './error';

const oauthServer = require('oauth2-server');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const os = oauthServer({
  model: require('./oauth/model'),
  grants: ['password', 'client_credentials'],
  accessTokenLifetime: 7 * 86400, // one week
});

function checkAuthentication(req, res, next) {
  if (process.env.NODE_ENV === 'unittest' && app.locals.authenticationDisabled) {
    req.user = {
      email: 'test@user',
      uuid: '9d1971e4-0a36-4070-9760-ca0a6bbb6821',
      roles: ['admin'],
      roleIds: [1],
    };
    return next();
  }

  if (req.path === '/meta/ping') {
    return next();
  }
  if (req.path.startsWith('/oauth')) {
    return next();
  }

  // oauth2-server makes sure that req.user is set when this call succeeds.
  os.authorise()(req, res, next);
}

function checkAuthorisation(req, res, next) {
  // Here, req.user contains:
  // user.roles = ['admin', 'user', ...]
  // user.permissions = ...?? data structure to be determined
  if (process.env.NODE_ENV === 'unittest' && app.locals.authorisationDisabled) {
    return next();
  }
  next();
}

app.post('/oauth/token', os.grant());
app.use(checkAuthentication);
app.use(checkAuthorisation);

app.get('/meta/ping', (req, res) => {
  res.send({ pong: 'Pong!' });
});

const routeConfig = getRouteConfig();
for (let m in routeConfig) {
  app.use('/api/v1/' + m, routeConfig[m]);
}

app.use(handleError);

export default app;
