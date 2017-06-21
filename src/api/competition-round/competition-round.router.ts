import { Router, Request, Response, NextFunction } from 'express';
import competitionRoundController from './competition-round.controller';
import BaseRouter from '../../core/base.router';

export class CompetitionRoundRouter extends BaseRouter {
}

const competitionRoundRoutes = new CompetitionRoundRouter(competitionRoundController);
export default competitionRoundRoutes.router;
