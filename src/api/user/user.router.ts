import { Router, Request, Response, NextFunction } from 'express';
import userController from './user.controller';
import BaseRouter from '../../core/base.router';

export class UserRouter extends BaseRouter {
}

const userRoutes = new UserRouter(userController);
export default userRoutes.router;
