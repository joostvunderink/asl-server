import { Router, Request, Response, NextFunction } from 'express';
import permissionController from './permission.controller';
import BaseRouter from '../../core/base.router';

export class PermissionRouter extends BaseRouter {
}

const permissionRoutes = new PermissionRouter(permissionController);
export default permissionRoutes.router;
