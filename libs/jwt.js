const expressJwt = require('express-jwt');

module.exports = jwt;

function jwt(config) {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
        // public routes that don't require authentication
        '/api/authenticate'
    ]
  });
}