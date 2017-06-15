import { Router, Request, Response, NextFunction } from 'express';
import countryController from './country.controller';

export class CountryRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getAll(req: Request, res: Response, next: NextFunction) {
    countryController.getAll()
    .then((ret) => {
      res.status(200).send(ret);
    });
  }

  public getOne(req: Request, res: Response, next: NextFunction) {
    countryController.getOne(req.params.id)
    .then((ret) => {
      res.status(200).send(ret);
    });
  }

  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
  }

}

// Create the CountryRouter, and export its configured Express.Router
const countryRoutes = new CountryRouter();
countryRoutes.init();

export default countryRoutes.router;
