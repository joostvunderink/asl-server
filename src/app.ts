import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import CountryRouter from './api/country/country.router';
import SportRouter   from './api/sport/sport.router';
import RegionRouter  from './api/region/region.router';
import ClubRouter    from './api/club/club.router';
import SeasonRouter  from './api/season/season.router';


// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  public getRouteConfig() {
    return {
      'countries': CountryRouter,
      'sports':    SportRouter,
      'regions':   RegionRouter,
      'clubs':     ClubRouter,
      'seasons':   SeasonRouter,
    };
  }

  // Configure API endpoints.
  private routes(): void {
    const routeConfig = this.getRouteConfig();
    for (let m in routeConfig) {
      this.express.use('/' + m, routeConfig[m]);
    }
  }

}

export default new App().express;