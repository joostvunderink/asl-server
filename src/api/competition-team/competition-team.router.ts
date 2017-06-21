import { Router, Request, Response, NextFunction } from 'express';
import competitionTeamController from './competition-team.controller';
import BaseRouter from '../../core/base.router';

export class CompetitionTeamRouter extends BaseRouter {
}

const competitionTeamRoutes = new CompetitionTeamRouter(competitionTeamController);
export default competitionTeamRoutes.router;
