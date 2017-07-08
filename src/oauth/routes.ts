const oauthServer = require('oauth2-server');

export function initOauth(app) {
  app.oauth = oauthServer({
    model: require('./model'),
    debug: true
  });

  // Post token.
  app.post('/oauth/token', app.oauth.token());
}