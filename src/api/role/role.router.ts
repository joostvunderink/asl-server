import { Router, Request, Response, NextFunction } from 'express';
import roleController from './role.controller';
import BaseRouter from '../../core/base.router';

export class RoleRouter extends BaseRouter {
}

const roleRoutes = new RoleRouter(roleController);
export default roleRoutes.router;
