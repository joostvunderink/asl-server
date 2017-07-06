import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import getRouteConfig from './routes';
import { initOauth } from './oauth/routes';
const oauthServer = require('express-oauth-server');

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  public oauth;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.initOauth();
  }

  private initOauth(): void {
     const os = new oauthServer({
      model: require('./oauth/model'),
      debug: true
    });
    console.log('os.token');
    console.log(os.token);
    this.oauth = os;
    // Post token.
    this.express.post('/oauth/token', this.oauth.token());

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