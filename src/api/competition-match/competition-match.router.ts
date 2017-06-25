import { Router, Request, Response, NextFunction } from 'express';
import competitionMatchController from './competition-match.controller';
import BaseRouter from '../../core/base.router';

export class CompetitionMatchRouter extends BaseRouter {
}

const competitionMatchRoutes = new CompetitionMatchRouter(competitionMatchController);
export default competitionMatchRoutes.router;
