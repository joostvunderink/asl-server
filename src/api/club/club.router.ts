import { Router, Request, Response, NextFunction } from 'express';
import clubController from './club.controller';
import BaseRouter from '../../core/base.router';

export class ClubRouter extends BaseRouter {
}

const clubRoutes = new ClubRouter(clubController);
export default clubRoutes.router;
