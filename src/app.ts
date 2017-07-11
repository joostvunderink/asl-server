import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import getRouteConfig from './routes';
import { initOauth } from './oauth/routes';
const oauthServer = require('oauth2-server');

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public oauth;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.metaRoutes();
    this.middleware();
    this.initOauth();
    this.routes();
  }

  private initOauth(): void {
    let self = this;
    const os = oauthServer({
      model: require('./oauth/model'),
      grants: ['password', 'client_credentials'],
      accessTokenLifetime: 7 * 86400, // one week
    });
    this.oauth = os;

    // Post token.
    this.express.post('/oauth/token', this.oauth.grant());

    function checkUser(req, res, next) {
      if (process.env.NODE_ENV !== 'unittest') {
        // This disables auth when running unit tests.
        // TODO: find a good way to handle auth in the test suite.
        // Authentication/authorisation tests should be a separate bunch, and the
        // rest of the tests should just test the functionality of the API.
        return next();
      }

      if (req.path === '/meta/ping') {
        return next();
      }
      if (req.path.startsWith('/oauth')) {
        return next();
      }
      self.oauth.authorise()(req, res, next);
    }
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private metaRoutes(): void {
    this.express.get('/meta/ping', (req, res) => {
      res.send({ pong: 'Pong!' });
    });
  }

  // Configure API endpoints.
  private routes(): void {
    const routeConfig = getRouteConfig();
    for (let m in routeConfig) {
      this.express.use('/api/v1/' + m, routeConfig[m]);
    }
  }

}

export default new App().express;