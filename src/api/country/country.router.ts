import { Router, Request, Response, NextFunction } from 'express';
import countryController from './country.controller';
import BaseRouter from '../../core/base.router';

export class CountryRouter extends BaseRouter {
}

const countryRoutes = new CountryRouter(countryController);
export default countryRoutes.router;
