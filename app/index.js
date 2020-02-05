/*load all necessary node modules*/
var express = require('express')
var bodyParser = require('body-parser');
var compression = require('compression');
var app = express()
var knex = require('../utils/db');
var logger = require("../utils/logger");
var helmet = require('helmet');
var auth = require('./auth');

app.use(compression({ threshold: 0 }));

app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(require("morgan")("combined", { "stream": logger.stream }));

var api_router = express.Router();
var auth_router = express.Router();
var token_router = express.Router();
var box_router = express.Router();
var unauth_router = express.Router();

/*load all necessary modules based on login criteria*/
app.use('/api', auth.api , api_router);
app.use('/auth' , auth.login , auth_router);
app.use('/token', auth.token, token_router);
app.use('/', unauth_router);

require('./login').init(auth_router, knex);
require('./refreshtoken').init(token_router);

require('./validatetoken').init(api_router);
require('./users').init(api_router, knex);

require('./signup').init(unauth_router, knex);

app.use(function (err, req, res, next) {
	//send error, if request is invalid
    res.status(err.status || 500).json({
        'error': {
            message: err.message,
            error: err
        }
    });
});

module.exports = app