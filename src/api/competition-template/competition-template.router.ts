import { Router, Request, Response, NextFunction } from 'express';
import competitionTemplateController from './competition-template.controller';
import BaseRouter from '../../core/base.router';

export class CompetitionTemplateRouter extends BaseRouter {
}

const competitionTemplateRoutes = new CompetitionTemplateRouter(competitionTemplateController);
export default competitionTemplateRoutes.router;
