export class PermissionDeniedError extends Error {
  statusCode: number;
  message: string;
  data: any;

  constructor(options) {
    const { message, statusCode, data } = options;
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, PermissionDeniedError.prototype);
    this.statusCode = statusCode || 401;
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

  if (err instanceof PermissionDeniedError) {
    return res.status(err.statusCode).send({
      errorMessage: err.message,
      errorCode: 'PermissionDeniedError',
      errorData: err.data,
    });
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

  console.log('Unknown error. Name: %s, Code: %s, err: %s', err.name, err.code, err);
  res.status(500).send('Unknown error.');
}
