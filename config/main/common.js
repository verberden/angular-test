const envFetch = require('../../utils/env_fetch');

module.exports = {
  secret: 'apdfkmdnewlpwek590edmefmni84392301ukdmode1187pm',
  port: envFetch('PORT', 3000),
};