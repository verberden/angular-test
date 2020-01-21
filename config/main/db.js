const envFetch = require('../../utils/env_fetch');

module.exports = {
  mainDb: {
    adapter: 'sequelize',
    host: envFetch('DB_HOST', 'localhost'),
    port: envFetch('DB_PORT', 3306),
    username: envFetch('DB_USER', 'user'),
    password: envFetch('DB_PASSWORD', '1234'),
    database: envFetch('DB_NAME', 'angular-test'),
    dialect: 'mysql',
  },
};