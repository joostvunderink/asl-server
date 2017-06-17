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
    .then(ret => {
      res.status(200).send(ret);
     })
    .catch(err => {
      if (err.name === 'CustomError' && err.message === 'EmptyResponse') {
        res.status(404).send();
      }
      else if (err.name.endsWith('NotFoundError')) {
        res.status(404).send();
      }
      else {
        res.status(500).send(err);
      }
    });
  }

  public create(req: Request, res: Response, next: NextFunction) {
    countryController.create(req.body)
    .then((createdEntity) => {
      // TODO: Add Location header. Figure out how to determine the base API URL here.
      res.status(201).send(createdEntity);
    });
  }

  public update(req: Request, res: Response, next: NextFunction) {
    countryController.update(req.params.id, req.body)
    .then((updatedEntity) => {
      res.status(200).send(updatedEntity);
    })
    .catch(err => {
      if (err.name === 'CustomError' && err.message === 'EmptyResponse') {
        res.status(404).send();
      }
      else if (err.name.endsWith('NotFoundError')) {
        res.status(404).send();
      }
      else {
        res.status(500).send(err);
      }
    });
  }

  init() {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
  }
}

// Create the CountryRouter, and export its configured Express.Router
const countryRoutes = new CountryRouter();
countryRoutes.init();

export default countryRoutes.router;
