import * as express from 'express';

export interface AslRequest extends express.Request {
  user: any;
  logger: any;
  ___startTime: any;
}

export { Response, Router, NextFunction } from 'express';
