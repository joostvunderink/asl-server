import { Router, Request, Response, NextFunction } from 'express';
import competitionController from './competition.controller';
import BaseRouter from '../../core/base.router';

export class CompetitionRouter extends BaseRouter {
}

const competitionRoutes = new CompetitionRouter(competitionController);
export default competitionRoutes.router;
