'use strict';

const bunyan = require('bunyan');

const loglevel = process.env.LOGLEVEL ? process.env.LOGLEVEL : 'DEBUG';

function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers
  };
}

const logger = bunyan.createLogger({
  name: 'asl-server',
  environment: process.env.NODE_ENV || 'development',
  level: loglevel,
  serializers: {
    req: reqSerializer,
    res: bunyan.stdSerializers.res,
    err: bunyan.stdSerializers.err
  }
});

export default logger;
