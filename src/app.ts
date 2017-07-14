import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import getRouteConfig from './routes';
import { initOauth } from './oauth/routes';
const oauthServer = require('oauth2-server');

let app = express();

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
    };
    return next();
  }

  if (req.path === '/meta/ping') {
    return next();
  }
  if (req.path.startsWith('/oauth')) {
    return next();
  }

  os.authorise()(req, res, next);
}

function checkAuthorisation(req, res, next) {
  if (process.env.NODE_ENV === 'unittest' && app.locals.authorisationDisabled) {
    return next();
  }

  next();
}

app.post('/oauth/token', os.grant());
app.use(checkAuthentication);
app.use(checkAuthorisation);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/meta/ping', (req, res) => {
  res.send({ pong: 'Pong!' });
});

const routeConfig = getRouteConfig();
for (let m in routeConfig) {
  app.use('/api/v1/' + m, routeConfig[m]);
}

app.use(function (err, req, res, next) {
  let errorMessage, errorCode;
  if (err.name === 'OAuth2Error') {
    errorCode = 'ERR_AUTH';
    if (process.env.NODE_ENV === 'production') {
      errorMessage = err;
    }
    else {
      errorMessage = err.stack;
    }
    return res.status(err.code || 500).send({ code: errorCode, message: errorMessage });
  }

  console.log('Unknown error. Name: %s, Code: %s, err: %s', err.name, err.code, err);
  res.status(500).send('Unknown error.');
});

export default app;
