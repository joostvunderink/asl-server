
import { Router, Request, Response, NextFunction } from 'express';
import personController from './person.controller';
import BaseRouter from '../../core/base.router';

export class PersonRouter extends BaseRouter {
}

const personRoutes = new PersonRouter(personController);
export default personRoutes.router;
