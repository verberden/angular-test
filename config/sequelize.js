require('dotenv').config();
const databases = require('./main/db');

const config = databases.mainDb;
const env = process.env.NODE_ENV || 'development';

module.exports = {
  [env]: config,
};
