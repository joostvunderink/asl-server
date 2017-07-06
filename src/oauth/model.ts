import User from '../api/user/user.model';
import { knex, bookshelf } from '../db';
const bcrypt = require('bcryptjs');

export function getUser(email, password) {
  return User.where('email', email).fetch()
    .then(function(user) {
      if (!user) {
        console.log('User with email %s not found', email);
        return false;
      }

      // console.log('comparing %s to %s', password, user.get('password'));
      const validPassword = bcrypt.compareSync(password, user.get('password'));
      if (validPassword) {
        return user;
      }

      console.log('Invalid password for user with email %s', email);
      return false;
    });
};

export function getAccessToken(bearerToken) {
  return knex('oauth_token').where('access_token', bearerToken)
  .then((tokens) => {
    if (tokens.length === 1) {
      return tokens[0];
    }
    else {
      console.error('Could not find oauth_token with access_token=%s', bearerToken);
    }
  });
}

export function getClient(clientId, clientSecret) {
  return knex('oauth_client').where('client_id', clientId).where('client_secret', clientSecret)
  .then((clients) => {
    if (clients.length === 1) {
      return {
        clientId: clients[0].client_id,
        clientSecret: clients[0].client_secret,
        grants: JSON.parse(clients[0].grants),
      };
    }
    else {
      console.error('Could not find client with id=%s', clientId);
    }
  });
}

export function getRefreshToken(bearerToken) {
  return knex('oauth_token').where('refresh_token', bearerToken)
  .then((tokens) => {
    if (tokens.length === 1) {
      return tokens[0];
    }
    else {
      console.error('Could not find oauth_token with access_token=%s', bearerToken);
    }
  });
}

export function saveToken(token, client, user) {
  return knex('oauth_token').insert({
    access_token            : token.accessToken,
    access_token_expires_on : token.accessTokenExpiresOn,
    refresh_token           : token.refreshToken,
    refresh_token_expires_on: token.refreshTokenExpiresOn,
    client_id               : client.clientId,
    user_uuid               : user.get('uuid')
  })
  .then(insertedToken => {
    token.client = client.clientId;
    token.user = user.get('uuid');
    return token;
  });
}

