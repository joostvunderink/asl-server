import { Router, Request, Response, NextFunction } from 'express';

export default class BaseRouter {
  router: Router;

  constructor(public controller) {
    this.router = Router();
    this.init();
  }

  getAll(req: Request, res: Response, next: NextFunction) {
    let filter;
    if (req.query.filter) {
      try {
        filter = JSON.parse(req.query.filter);
      }
      catch (e) {
        return res.status(400).send({
          code: 'JsonParseError',
          message: 'Error parsing "filter" parameter: ' + e,
        });
      }
    }
    
    this.controller.getAll({ filter: filter })
    .then((ret) => {
      res.status(200).send(ret);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        error: err.message ? err.message : err.toString()
      });
     });;
  }

  public getOne(req: Request, res: Response, next: NextFunction) {
    let filter;
    if (req.query.filter) {
      try {
        filter = JSON.parse(req.query.filter);
      }
      catch (e) {
        return res.status(400).send({
          code: 'JsonParseError',
          message: 'Error parsing "filter" parameter: ' + e,
        });
      }
    }

    this.controller.getOne({ id: req.params.id, filter: filter })
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
        console.error(err);
        res.status(500).send(err);
      }
    });
  }

  public create(req: Request, res: Response, next: NextFunction) {
    this.controller.create(req.body)
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
      } else if (err.name === 'ValidationError') {
        res.status(400).send({
          code: err.name,
          message: err.message,
        });
      } else {
        res.status(500).send(err);
      }
    });
  }

  public update(req: Request, res: Response, next: NextFunction) {
    this.controller.update(req.params.id, req.body)
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
        console.error(err);
        res.status(500).send(err);
      }
    });
  }

  public deleteOne(req: Request, res: Response, next: NextFunction) {
    this.controller.delete(req.params.id)
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
    let self = this;

    function wrap(fname) {
      // This wrap trick is needed to make sure the methods are called from
      // the context of the instance, instead of 'bare'. This way, we make
      // sure that 'this' is available in the methods.
      // After all, express has no idea that the router function is actually
      // an instance method.
      return function(req: Request, res: Response, next: NextFunction) {
        return self[fname](req, res, next);
      }
    }

    this.router.get('/',       wrap('getAll'));
    this.router.get('/:id',    wrap('getOne'));
    this.router.post('/',      wrap('create'));
    this.router.put('/:id',    wrap('update'));
    this.router.delete('/:id', wrap('deleteOne'));
  }
}
