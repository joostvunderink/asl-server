import { Router, Request, Response, NextFunction } from 'express';
import userRoleController from './user-role.controller';
import BaseRouter from '../../core/base.router';

export class UserRoleRouter extends BaseRouter {
}

const userRoleRoutes = new UserRoleRouter(userRoleController);
export default userRoleRoutes.router;
