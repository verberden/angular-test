// require('rootpath')();
require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const libs = require('./libs');
const config = require('./config');

const env = process.env.NODE_ENV === undefined ? 'development' : process.env.NODE_ENV;
app.set('views', path.join(__dirname, 'web', 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// use JWT auth to secure the api
app.use(libs.jwt(config.common));

const dbs = libs.db({ env, config: config.db });

const apiModels = require('./api/models')({ dbs });
const apiUserService = require('./api/services/user')({
    models: apiModels,
    config,
});
// api routes
// app.use('/api', require('./api/router')(router, apiModels, apiUserService));
app.use('/client', require('./client/router')(router));

// global error handler
app.use(libs['error-handler']);

// start server
const port = config.common.port;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});