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
    this.middleware();
    this.initOauth();
    this.routes();
  }

  private initOauth(): void {
     const os = oauthServer({
      model: require('./oauth/model'),
      grants: ['password', 'client_credentials'],
      debug: true,
      accessTokenLifetime: 7 * 86400, // one week
    });
    this.oauth = os;

    // Post token.
    this.express.post('/oauth/token', this.oauth.grant());

    this.express.use(this.oauth.authorise());
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    const routeConfig = getRouteConfig();
    for (let m in routeConfig) {
      this.express.use('/' + m, routeConfig[m]);
    }
  }

}

export default new App().express;