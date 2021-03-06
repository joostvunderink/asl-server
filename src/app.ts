import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as uuid from 'uuid';
import * as cors from 'cors';
import getRouteConfig from './routes/api';
import { addImportRoutes } from './routes/import';
import { initOauth } from './oauth/routes';
import { handleError } from './error';
import logger from './logger';
import { Router, AslRequest, Response, NextFunction } from './core/express.types';
import { initEventHandlers } from './events';

const oauthServer = require('oauth2-server');

let app = express();

app.use((req: AslRequest, res: Response, next: NextFunction) => {
  req.___startTime = new Date();
  next();
});

app.use((req: AslRequest, res: Response, next: NextFunction) => {
  req.logger = logger.child({ request_id: uuid.v4() });
  req.logger.debug({
    url: req.url,
    path: req.path,
  }, 'Incoming request');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var whitelist = [
  'http://localhost:4200',
  'http://localhost:4224',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    const whitelisted = whitelist.indexOf(origin) !== -1;
    if (!whitelisted) {
      logger.warn({
        url: origin,
      }, 'Request from non-whitelisted host');
      return callback(new Error('Bad Request'), false);
    }
    callback(null, true);
  },
  credentials: true
}));

initEventHandlers();

const os = oauthServer({
  model: require('./oauth/model'),
  grants: ['password', 'client_credentials'],
  accessTokenLifetime: 7 * 86400, // one week
});

function checkAuthentication(req: AslRequest, res: Response, next: NextFunction) {
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

function checkAuthorisation(req: AslRequest, res: Response, next: NextFunction) {
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

app.get('/meta/ping', (req: AslRequest, res: Response) => {
  res.send({ pong: 'Pong!' });
});

const routeConfig = getRouteConfig();
for (let m in routeConfig) {
  app.use('/api/v1/' + m, routeConfig[m]);
}

addImportRoutes(app);

app.use(handleError);

app.use((req: AslRequest, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    const endTime = new Date();
    const diff = endTime.getTime() - req.___startTime.getTime();
    req.logger.debug({
      duration: diff,
      statusCode: res.statusCode,
      method: req.method,
      url: req.originalUrl
    }, 'Request duration');
  });
  next();
});

export default app;
