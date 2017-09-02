import User from '../api/user/user.model';
import Role from '../api/role/role.model';
import { knex, bookshelf } from '../db';
import logger from '../logger';

const bcrypt = require('bcryptjs');
const OAuth2Error = require('oauth2-server/lib/error');

// Authentication via POST /oauth/token
// * getClient
// * grantTypeAllowed
// * getUser
// * saveAccessToken

export function getClient(clientId, clientSecret, callback) {
  const clogger = logger.child({ section: 'oauth', method: 'getClient' });
  clogger.debug({ clientId, clientSecret }, 'Calling getClient');
  let query = knex('oauth_client').where('client_id', clientId);
  if (clientSecret) {
    query = query.where('client_secret', clientSecret);
  }
  return query
  .then((clients) => {
    if (clients.length === 1) {
      clogger.debug({ client: clients[0] }, 'Found client');
      callback(null, {
        clientId    : clients[0].client_id,
        clientSecret: clients[0].client_secret,
        grants      : JSON.parse(clients[0].grants),
        redirectUris: [clients[0].redirect_url],
      });
    }
    else {
      clogger.error({ clientId, num_results: clients.length }, 'Could not find client');
      callback('Could not find client');
    }
  });
}

export function grantTypeAllowed(clientId, grantType, callback) {
  const clogger = logger.child({ section: 'oauth', method: 'grantTypeAllowed' });
  clogger.debug({ clientId, grantType }, 'Calling grantTypeAllowed');
  let query = knex('oauth_client').where('client_id', clientId);

  return query
  .then((clients) => {
    if (clients.length === 1) {
      const grants = JSON.parse(clients[0].grants);
      const hasGrantType = grants.indexOf(grantType) >= 0;

      clogger.debug({ client: clients[0], hasGrantType: hasGrantType }, 'Found client');
      callback(null, hasGrantType);
    }
    else {
      clogger.error({ clientId, num_results: clients.length }, 'Could not find client with id=%s');
      callback('Could not find client');
    }
  });
};

export function getUser(email, password, callback) {
  const clogger = logger.child({ section: 'oauth', method: 'getUser' });
  clogger.debug({ email }, 'Calling getUser');
  return User.where('email', email).fetch()
    .then(function(user) {
      if (!user) {
        clogger.debug({ email }, 'User not found');
        return callback();
      }

      const validPassword = bcrypt.compareSync(password, user.get('password'));
      if (validPassword) {
        const userData = {
          uuid: user.get('uuid'),
          username: user.get('email'),
        };
        clogger.debug({ email }, 'Email and password correct')
        return callback(null, userData);
      }

      clogger.debug({ email }, 'Invalid password');
      return callback();
    });
};

export function saveAccessToken(accessToken, clientId, expires, user, callback) {
  const clogger = logger.child({ section: 'oauth', method: 'saveAccessToken' });
  clogger.debug({ clientId, expires, user }, 'Calling saveAccessToken');
  return knex('oauth_token').insert({
    access_token            : accessToken,
    access_token_expires_on : expires,
    client_id               : clientId,
    user_uuid               : user.uuid
  })
  .then(() => {
    return callback(null);
  });
}

export function getAccessToken(bearerToken, callback) {
  const clogger = logger.child({ section: 'oauth', method: 'getAccessToken' });
  clogger.debug({ bearerToken }, 'Calling getAccessToken');

  if (!bearerToken) {
    // Explicit return in case the bearer token is not passed at all.
    // This protects from the corner case where somehow an access token
    // ends up in the database with an empty value.
    clogger.warn('Bearer token not given. Possibly a database/code issue');
    return callback();
  }

  // TODO: This promise chain makes error handling difficult.
  // Rewrite this, maybe to await/async.
  let token, user;
  let errorForCallback;

  knex('oauth_token').where('access_token', bearerToken)
  .then((tokens) => {
    if (tokens.length !== 1) {
      clogger.warn({ bearerToken }, 'Could not find oauth_token with given access_token');
      // We explicitly do NOT set 'errorForCallback' here. This will make sure any validly
      // formatted requests that contain an invalid access token will get a 403 error.
      let e = new Error('Access token not found');
      throw e;
    }

    token = tokens[0];
      
    return User.where('uuid', token.user_uuid).fetch({ withRelated: ['roles'] });
  })
  .then(user => {
    if (!user) {
      clogger.error({ token }, 'User not found by token\'s user_uuid');
      errorForCallback = 'User not found by token\'s user_uuid';
      throw new Error('User not found by token\'s user_uuid');
    }

    const tokenData = {
      accessToken: token.access_token,
      expires    : token.access_token_expires_on,
      clientId   : token.client_id,
      user: {
        email: user.get('email'),
        id   : user.get('id'),
        uuid : user.get('uuid'),
        roles: user.related('roles').map(role => role.get('name')),
        roleIds: user.related('roles').map(role => role.get('id')),
        permissions: {},
      }
    };
    clogger.debug('Access token found and returned');

    return callback(null, tokenData);
  })
  .catch(e => {
    if (e.message !== 'Access token not found') {
      clogger.error({
        error_name: e.name,
        error_message: e.message,
      }, 'getAccessToken unexpected error');
    }
    return callback(errorForCallback);
  });;
}

// TODO: do something with this.
// export function getRefreshToken(bearerToken) {
//   return knex('oauth_token').where('refresh_token', bearerToken)
//   .then((tokens) => {
//     if (tokens.length === 1) {
//       return tokens[0];
//     }
//     else {
//       clogger.error('Could not find oauth_token with access_token=%s', bearerToken);
//     }
//   });
// }
