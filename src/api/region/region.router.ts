import { Router, Request, Response, NextFunction } from 'express';
import regionController from './region.controller';
import BaseRouter from '../../core/base.router';

export class RegionRouter extends BaseRouter {
}

const regionRoutes = new RegionRouter(regionController);
export default regionRoutes.router;
