import { Router, Request, Response, NextFunction } from 'express';
import teamController from './team.controller';
import BaseRouter from '../../core/base.router';

export class TeamRouter extends BaseRouter {
}

const teamRoutes = new TeamRouter(teamController);
export default teamRoutes.router;
