import User from '../api/user/user.model';
import { knex, bookshelf } from '../db';
const bcrypt = require('bcryptjs');

// Authentication via POST /oauth/token
// * getClient
// * grantTypeAllowed
// * getUser
// * saveAccessToken

export function getClient(clientId, clientSecret, callback) {
  console.log('model: getClient with clientId=%s clientSecret=%s', clientId, clientSecret);
  let query = knex('oauth_client').where('client_id', clientId);
  if (clientSecret) {
    query = query.where('client_secret', clientSecret);
  }
  return query
  .then((clients) => {
    if (clients.length === 1) {
      console.log('Found client');
      callback(null, {
        clientId    : clients[0].client_id,
        clientSecret: clients[0].client_secret,
        grants      : JSON.parse(clients[0].grants),
        redirectUris: [clients[0].redirect_url],
      });
    }
    else {
      console.error('Could not find client with id=%s', clientId);
      callback('Could not find client');
    }
  });
}

export function grantTypeAllowed(clientId, grantType, callback) {
  console.log('oauth model: grantTypeAllowed clientId=%s grantType=%s', clientId, grantType);
  let query = knex('oauth_client').where('client_id', clientId);

  return query
  .then((clients) => {
    if (clients.length === 1) {
      console.log('Found client');
      const grants = JSON.parse(clients[0].grants);

      callback(null, grants.indexOf(grantType) >= 0);
    }
    else {
      console.error('Could not find client with id=%s', clientId);
      callback('Could not find client');
    }
  });
};

export function getUser(email, password, callback) {
  console.log('model: getUser email=%s password=%s', email, password);
  return User.where('email', email).fetch()
    .then(function(user) {
      if (!user) {
        console.log('User with email %s not found', email);
        return callback('User and/or password incorrect');
      }

      const validPassword = bcrypt.compareSync(password, user.get('password'));
      if (validPassword) {
        const userData = {
          uuid: user.get('uuid'),
          username: user.get('email'),
        };
        return callback(null, userData);
      }

      console.log('Invalid password for user with email %s', email);
      return callback('User and/or password incorrect');
    });
};

export function saveAccessToken(accessToken, clientId, expires, user, callback) {
  console.log('model: saveAccessToken');
  console.log(user);
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
  // console.log('model: getAccessToken');
  return knex('oauth_token').where('access_token', bearerToken)
  .then((tokens) => {
    if (tokens.length !== 1) {
      console.error('Could not find oauth_token with access_token=%s', bearerToken);
      return callback('No such bearer token');
    }
    const tokenData = {
      accessToken: tokens[0].access_token,
      expires: tokens[0].access_token_expires_on,
      clientId: tokens[0].client_id,
    };

    return callback(null, tokenData);
  });
}

// TODO: do something with this.
// export function getRefreshToken(bearerToken) {
//   return knex('oauth_token').where('refresh_token', bearerToken)
//   .then((tokens) => {
//     if (tokens.length === 1) {
//       return tokens[0];
//     }
//     else {
//       console.error('Could not find oauth_token with access_token=%s', bearerToken);
//     }
//   });
// }
