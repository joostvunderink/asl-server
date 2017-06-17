import { Router, Request, Response, NextFunction } from 'express';
import regionController from './region.controller';

export class RegionRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getAll(req: Request, res: Response, next: NextFunction) {
    regionController.getAll()
    .then((ret) => {
      res.status(200).send(ret);
    });
  }

  public getOne(req: Request, res: Response, next: NextFunction) {
    regionController.getOne(req.params.id)
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
    regionController.create(req.body)
    .then((createdEntity) => {
      // TODO: Add Location header. Figure out how to determine the base API URL here.
      res.status(201).send(createdEntity);
    })
    .catch(err => {
      if (err.code && err.code.startsWith('ER_')) {
        res.status(400).send({
          code: err.code,
          message: err.message,
        });
      }
      else {
        res.status(500).send(err);
      }
    });
  }

  public update(req: Request, res: Response, next: NextFunction) {
    regionController.update(req.params.id, req.body)
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

  public deleteOne(req: Request, res: Response, next: NextFunction) {
    regionController.delete(req.params.id)
    .then(() => {
      res.status(204).send();
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
    this.router.delete('/:id', this.deleteOne);
  }
}

// Create the RegionRouter, and export its configured Express.Router
const regionRoutes = new RegionRouter();
regionRoutes.init();

export default regionRoutes.router;
