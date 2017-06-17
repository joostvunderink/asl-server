import { Router, Request, Response, NextFunction } from 'express';
import sportController from './sport.controller';
import BaseRouter from '../base.router';

export class SportRouter extends BaseRouter {
}

const sportRoutes = new SportRouter(sportController);
export default sportRoutes.router;
