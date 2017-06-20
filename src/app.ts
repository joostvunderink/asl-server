import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import getRouteConfig from './routes';

import ClubRouter                from './api/club/club.router';
import CompetitionRouter         from './api/competition/competition.router';
import CompetitionTemplateRouter from './api/competition-template/competition-template.router';
import CountryRouter             from './api/country/country.router';
import PersonRouter              from './api/person/person.router';
import RegionRouter              from './api/region/region.router';
import SeasonRouter              from './api/season/season.router';
import SportRouter               from './api/sport/sport.router';
import TeamRouter                from './api/team/team.router';


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

  // Configure API endpoints.
  private routes(): void {
    const routeConfig = getRouteConfig();
    for (let m in routeConfig) {
      this.express.use('/' + m, routeConfig[m]);
    }
  }

}

export default new App().express;