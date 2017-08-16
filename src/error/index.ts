import logger from '../logger';

export class AslError extends Error {
  name: string;
  statusCode: number;
  message: string;
  data: any;

  constructor(options) {
    const { message, statusCode, data } = options;
    super(message);

    // Set the prototype explicitly.
    this.name = this.constructor.name;
  }
}

export class PermissionDeniedError extends AslError {
  constructor(options) {
    const { message, statusCode, data } = options;
    super(options);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, PermissionDeniedError.prototype);
    this.statusCode = statusCode || 401;
    this.data = data || {};
  }
}

export class ParseError extends AslError {
  constructor(options) {
    const { message, statusCode, data } = options;
    super(options);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ParseError.prototype);
    this.statusCode = statusCode || 400;
    this.data = data || {};
  }
}

export class InvalidInputError extends AslError {
  constructor(options) {
    const { message, statusCode, data } = options;
    super(options);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ParseError.prototype);
    this.statusCode = statusCode || 400;
    this.data = data || {};
  }
}

function getErrorMessage(err) {
  if (process.env.NODE_ENV === 'production') {
    return err;
  }
  else {
    return err.stack;
  }
}

export function handleError(err, req, res, next) {
  let errorMessage, errorCode;

  const knownErrors = [
    PermissionDeniedError,
    ParseError,
  ];

  for (let i = 0; i < knownErrors.length; i++) {
    if (err instanceof knownErrors[i]) {
      return res.status(err.statusCode).send({
        errorMessage: err.message,
        errorCode: err.name,
        errorData: err.data,
      });
    }
  }

  if (err.name === 'CustomError' && err.message === 'EmptyResponse') {
    errorCode = 'NotFoundError';
    errorMessage = getErrorMessage(err);
    return res.status(err.code || 404).send({ code: errorCode, message: errorMessage });
  }
  if (err.name === 'OAuth2Error') {
    errorCode = 'ERR_AUTH';
    errorMessage = getErrorMessage(err);
    return res.status(err.code || 500).send({ code: errorCode, message: errorMessage });
  }

  if (err.code && err.code.startsWith('ER_')) {
    return res.status(400).send({
      code: err.code,
      message: err.message,
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).send({
      code: err.name,
      message: err.message,
    });
  }

  else if (err.name.endsWith('NotFoundError')) {
    return res.status(404).send();
  }

  logger.error({ name: err.name, code: err.code, error: err }, 'Unknown error.');
  let body: any = {
    errorMessage: 'Unknown error',
    errorCode: err.name,
    errorData: {
      data: err.data,
      name: err.name,
      code: err.code,
      message: err.message,
    },
  };
  if (process.env.NODE_ENV !== 'production') {
    body.errorStack = err.stack;
  }
  res.status(500).send(body);
}
