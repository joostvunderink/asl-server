import { Router, Request, Response, NextFunction } from 'express';
import seasonController from './season.controller';
import BaseRouter from '../../core/base.router';

export class SeasonRouter extends BaseRouter {
}

const seasonRoutes = new SeasonRouter(seasonController);
export default seasonRoutes.router;
